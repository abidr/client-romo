const { createMollieClient } = require('@mollie/api-client');
const stripe = require('stripe');
const db = require('../config/db.config');

const Gateway = db.gateways;
const Deposit = db.deposits;
const Buy = db.buys;
const Log = db.logs;
const Setting = db.settings;

const { executePaymentPaypal } = require('../utils/payments/paypal');

exports.verifyMollie = async (req, res) => {
  const mollie = await Gateway.findOne({ where: { value: 'mollie' } });
  const mollieClient = createMollieClient({ apiKey: mollie.api_key });
  try {
    const data = await mollieClient.payments.get(req.body.id);
    if (data.status === 'paid') {
      if (data.metadata.type === 'deposit') {
        await Deposit.update({ payment_status: true }, { where: { id: data.metadata.id } });
        await Log.create({ message: `Mollie confirmed payment for deposit #${data.metadata.id}` });
      } else {
        const buy = await Buy.findOne({ where: { id: data.metadata.id } });
        await Buy.update({ payment_status: true }, { where: { id: data.metadata.id } });
        await Log.create({ message: `Mollie confirmed payment for Exchange #${buy.exchangeId}` });
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
        await Deposit.update(
          { payment_status: true },
          { where: { id: req.body.event.data.metadata.id } },
        );
        await Log.create({ message: `Coinbase confirmed payment for deposit #${req.body.event.data.metadata.id}` });
      } else {
        const buy = await Buy.findOne({ where: { id: req.body.event.data.metadata.id } });
        await Buy.update(
          { payment_status: true },
          { where: { id: req.body.event.data.metadata.id } },
        );
        await Log.create({ message: `Coinbase confirmed payment for Exchange #${buy.exchangeId}` });
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
      await Deposit.update({ payment_status: true }, { where: { id: req.body.invoice } });
      await Log.create({ message: `CoinPayments confirmed payment for Deposit #${req.body.invoice}` });
      return res.json({ message: 'Payment Verified' });
    }
    return res.json({ message: 'Payment not verified' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.verifyPaypal = async (req, res) => {
  const { PayerID, paymentId } = req.query;
  try {
    const appUrl = await Setting.findOne({ where: { value: 'app_url' } });
    const payment = await executePaymentPaypal(PayerID, paymentId);
    if (payment.state === 'approved') {
      const depositId = payment.transactions[0].item_list.items[0].sku;
      await Deposit.update({ payment_status: true },
        { where: { id: depositId } });
      await Log.create({ message: `Paypal confirmed payment for Deposit #${depositId}` });
    }
    return res.redirect(`${appUrl.param1}/deposits`);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.verifyStripe = async (req, res) => {
  const data = await Gateway.findOne({ where: { value: 'stripe' } });
  const stripeInit = stripe(data.secret_key);
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
    await Deposit.update({ payment_status: true }, { where: { id: session.metadata.depositId } });
    await Log.create({ message: `Stripe confirmed payment for Deposit #${session.metadata.depositId}` });
  }
  return res.json({ message: 'Payment verified' });
};
