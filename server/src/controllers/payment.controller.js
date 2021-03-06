const { createMollieClient } = require('@mollie/api-client');
const stripe = require('stripe');
const {
  client, testClient,
} = require('coingate-v2');
const PayStack = require('paystack-node');
const rp = require('request-promise');
const Flutterwave = require('flutterwave-node-v3');
const db = require('../config/db.config');

const Gateway = db.gateways;
const Withdraw = db.withdraws;
const Deposit = db.deposits;
const Log = db.logs;
const Setting = db.settings;

const { executePaymentPaypal } = require('../utils/payments/paypal');
const { addBalance } = require('../utils/wallet');
const { firstDeposit } = require('../utils/firstDeposit');

exports.verifyMollie = async (req, res) => {
  const mollie = await Gateway.findOne({ where: { value: 'mollie' } });
  const mollieClient = createMollieClient({ apiKey: mollie.apiKey });
  try {
    const data = await mollieClient.payments.get(req.body.id);
    if (data.status === 'paid') {
      if (data.metadata.type === 'deposit') {
        const depositData = await Deposit.findByPk(data.metadata.id);
        await addBalance(depositData.amount, depositData.currency, depositData.userId);
        await Deposit.update({ payment_status: true, status: 'success' }, { where: { id: data.metadata.id } });
        await Log.create({ message: `Mollie confirmed payment for deposit #${data.metadata.id}` });
        firstDeposit(depositData.id);
      }
    }
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.verifyCoinbase = async (req, res) => {
  try {
    if (req.body.event.type === 'charge:confirmed') {
      if (req.body.event.data.metadata.type === 'deposit') {
        const depositData = await Deposit.findByPk(req.body.event.data.metadata.id);
        await addBalance(depositData.amount, depositData.currency, depositData.userId);
        await Deposit.update(
          { payment_status: true, status: 'success' },
          { where: { id: req.body.event.data.metadata.id } },
        );
        await Log.create({ message: `Coinbase confirmed payment for deposit #${req.body.event.data.metadata.id}` });
        firstDeposit(depositData.id);
      }
    }
    return res.json({ message: 'Confirmed Payment' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.verifyCoinPayments = async (req, res) => {
  try {
    if (req.body.status === 1) {
      const depositData = await Deposit.findByPk(req.body.invoice);
      await addBalance(depositData.amount, depositData.currency, depositData.userId);
      await Deposit.update({ payment_status: true, status: 'success' }, { where: { id: req.body.invoice } });
      await Log.create({ message: `CoinPayments confirmed payment for Deposit #${req.body.invoice}` });
      firstDeposit(depositData.id);
      return res.json({ message: 'Payment Verified' });
    }
    return res.json({ message: 'Payment not verified' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.verifyPaypal = async (req, res) => {
  const { PayerID, paymentId } = req.query;
  const appUrl = await Setting.findOne({ where: { value: 'appUrl' } });
  try {
    const payment = await executePaymentPaypal(PayerID, paymentId);
    if (payment.state === 'approved') {
      const depositId = payment.transactions[0].item_list.items[0].sku;
      const depositData = await Deposit.findByPk(depositId);
      await addBalance(depositData.amount, depositData.currency, depositData.userId);
      await Deposit.update({ payment_status: true, status: 'success' },
        { where: { id: depositId } });
      await Log.create({ message: `Paypal confirmed payment for Deposit #${depositId}` });
      firstDeposit(depositData.id);
    }
    return res.redirect(`${appUrl.param1}/add-money?status=success`);
  } catch (err) {
    return res.redirect(`${appUrl.param1}/add-money?status=failed`);
  }
};
exports.verifyStripe = async (req, res) => {
  const data = await Gateway.findOne({ where: { value: 'stripe' } });
  const stripeInit = stripe(data.secretKey);
  const payload = req.body;
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripeInit.webhooks.constructEvent(payload, sig, data.ex1);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const depositData = await Deposit.findByPk(session.metadata.depositId);
    await addBalance(depositData.amount, depositData.currency, depositData.userId);
    await Deposit.update({ payment_status: true, status: 'success' }, { where: { id: session.metadata.depositId } });
    await Log.create({ message: `Stripe confirmed payment for Deposit #${session.metadata.depositId}` });
    firstDeposit(depositData.id);
  }
  return res.json({ message: 'Payment verified' });
};
exports.verifyCoingate = async (req, res) => {
  const data = await Gateway.findOne({ where: { value: 'coingate' } });
  const coingate = client(data.apiKey);
  const testCongate = testClient(data.apiKey);

  const clientMain = data.ex1 === 'sandbox' ? testCongate : coingate;

  try {
    const dataOrder = await clientMain.getOrder(req.body.id);
    if (dataOrder.status === 'paid') {
      const depositData = await Deposit.findByPk(dataOrder.order_id);
      await addBalance(depositData.amount, depositData.currency, depositData.userId);
      await Deposit.update({ payment_status: true, status: 'success' }, { where: { id: dataOrder.order_id } });
      await Log.create({ message: `Stripe confirmed payment for Deposit #${dataOrder.order_id}` });
      firstDeposit(depositData.id);
    }
    return res.json({ message: 'Payment verified' });
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
};
exports.verifyPaystack = async (req, res) => {
  const { reference } = req.query;
  const appUrl = await Setting.findOne({ where: { value: 'appUrl' } });
  try {
    const gateway = await Gateway.findOne({ where: { value: 'paystack' } });
    const paystack = new PayStack(gateway.apiKey, process.env.NODE_ENV);

    const payment = await paystack.verifyTransaction({
      reference: `${reference}`,
    });

    if (payment.body.data.status === 'success') {
      const depositData = await Deposit.findByPk(reference);
      await addBalance(depositData.amount, depositData.currency, depositData.userId);
      await Deposit.update({ payment_status: true, status: 'success' },
        { where: { id: reference } });
      await Log.create({ message: `Paystack confirmed payment for Deposit #${reference}` });
      firstDeposit(depositData.id);
      return res.redirect(`${appUrl.param1}/add-money?status=success`);
    }
    return res.redirect(`${appUrl.param1}/add-money?status=failed`);
  } catch (err) {
    return res.redirect(`${appUrl.param1}/add-money?status=failed`);
  }
};
exports.verifyVoguePay = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { transaction_id } = req.body;
  try {
    const gateway = await Gateway.findOne({ where: { value: 'voguepay' } });

    const obj = {
      v_merchant_id: gateway.ex1,
      type: 'json',
      v_transaction_id: transaction_id,
    };

    const qs = new URLSearchParams(obj);

    const apiData = await rp({
      method: 'GET',
      uri: `https://pay.voguepay.com?${qs}`,
      json: true,
    });

    if (apiData.status === 'Approved') {
      const depositData = await Deposit.findByPk(apiData.merchant_ref);
      await addBalance(depositData.amount, depositData.currency, depositData.userId);
      await Deposit.update({ payment_status: true, status: 'success' },
        { where: { id: apiData.merchant_ref } });
      await Log.create({ message: `Paystack confirmed payment for Deposit #${apiData.merchant_ref}` });
      firstDeposit(depositData.id);
      return res.json({ message: 'Payment verified' });
    }
    return res.json({ message: 'Payment verified' });
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
};
exports.verifyPerfectMoney = async (req, res) => {
  try {
    const depositData = await Deposit.findByPk(req.body.PAYMENT_ID);
    await addBalance(depositData.amount, depositData.currency, depositData.userId);
    await Deposit.update({ payment_status: true, status: 'success' }, { where: { id: depositData.id } });
    await Log.create({ message: `PerfectMoney confirmed payment for deposit #${depositData.id}` });
    firstDeposit(depositData.id);
    return res.json({ message: 'Payment verified' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.verifyPayDunya = async (req, res) => {
  try {
    const depositData = await Deposit.findByPk(req.body.custom_data.depositId);
    if (req.body.status === 'completed') {
      await addBalance(depositData.amount, depositData.currency, depositData.userId);
      await Deposit.update({ payment_status: true, status: 'success' }, { where: { id: depositData.id } });
      await Log.create({ message: `PayDunya confirmed payment for deposit #${depositData.id}` });
      firstDeposit(depositData.id);
      return res.json({ message: 'Payment verified' });
    }
    return res.json({ message: 'Payment not verified' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.verifyTouchPay = async (req, res) => {
  try {
    const depositData = await Deposit.findByPk(req.body.partner_transaction_id);
    if (req.body.status === 'SUCCESSFUL') {
      await addBalance(depositData.amount, depositData.currency, depositData.userId);
      await Deposit.update({ payment_status: true, status: 'success' }, { where: { id: depositData.id } });
      await Log.create({ message: `TouchPay confirmed payment for deposit #${depositData.id}` });
      firstDeposit(depositData.id);
      return res.json({ message: 'Payment verified' });
    }
    return res.json({ message: 'Payment not verified' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.verifyFlutterWave = async (req, res) => {
  const appUrl = await Setting.findOne({ where: { value: 'appUrl' } });
  if (req.query.status === 'successful') {
    const depData = await Deposit.findByPk(req.query.tx_ref);
    const gateway = await Gateway.findOne({ where: { value: 'flutterwave' } });
    const flw = new Flutterwave(gateway.apiKey, gateway.secretKey);
    const response = await flw.Transaction.verify({ id: req.query.transaction_id });
    if (depData.status === 'success') {
      return res.redirect(`${appUrl.param1}/add-money?status=success`);
    }
    if (
      response.data.status === 'successful'
        && response.data.amount === depData.amount) {
      await addBalance(depData.amount, depData.currency, depData.userId);
      await Deposit.update({ payment_status: true, status: 'success' },
        { where: { id: depData.id } });
      await Log.create({ message: `Flutterwave confirmed payment for Deposit #${req.query.tx_ref}` });
      firstDeposit(depData.id);
      return res.redirect(`${appUrl.param1}/add-money?status=success`);
    }
    await Deposit.update({ payment_status: false, status: 'failed' },
      { where: { id: depData.id } });
    return res.redirect(`${appUrl.param1}/add-money?status=failed`);
  }
  return res.redirect(`${appUrl.param1}/add-money?status=failed`);
};
exports.verifyMtn = async (req, res) => {
  try {
    const depositData = await Deposit.findByPk(req.body.externalId);
    if (req.body.status === 'SUCCESSFUL') {
      await addBalance(depositData.amount, depositData.currency, depositData.userId);
      await Deposit.update({ payment_status: true, status: 'success' }, { where: { id: depositData.id } });
      await Log.create({ message: `MTN confirmed payment for deposit #${depositData.id}` });
      firstDeposit(depositData.id);
      return res.json({ message: 'Payment verified' });
    }
    await Deposit.update({ payment_status: false, status: 'failed' }, { where: { id: depositData.id } });
    await Log.create({ message: `MTN declined payment for deposit #${depositData.id}` });
    firstDeposit(depositData.id);
    return res.json({ message: 'Payment declined' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.verifyWithdrawMtn = async (req, res) => {
  try {
    const depositData = await Withdraw.findByPk(req.body.externalId);
    if (req.body.status === 'SUCCESSFUL') {
      await Withdraw.update({ status: 'success' }, { where: { id: depositData.id } });
      await Log.create({ message: `MTN confirmed withdraw for withdraw #${depositData.id}` });
      return res.json({ message: 'Withdraw verified' });
    }
    await Withdraw.update({ status: 'failed' }, { where: { id: depositData.id } });
    await Log.create({ message: `MTN declined withdraw for withdraw #${depositData.id}` });
    return res.json({ message: 'Withdraw declined' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
