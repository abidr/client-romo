const paypal = require('paypal-node-sdk');
const db = require('../../config/db.config');

const Gateway = db.gateways;
const Setting = db.settings;

exports.paypalPayment = async (value, id) => {
  try {
    const data = await Gateway.findOne({ where: { value: 'paypal' } });
    const apiUrl = await Setting.findOne({ where: { value: 'api_url' } });

    paypal.configure({
      mode: data.ex1,
      client_id: data.api_key,
      client_secret: data.secret_key,
    });

    const paypalPaymentObj = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: `${apiUrl.param1}/payments/paypal`,
        cancel_url: `${apiUrl.param1}/payments/paypal`,
      },
      transactions: [{
        item_list: {
          items: [{
            name: `Deposit #${id}`,
            sku: `${id}`,
            price: value.toFixed(2),
            currency: 'USD',
            quantity: 1,
          }],
        },
        amount: {
          currency: 'USD',
          total: value.toFixed(2),
        },
        description: 'Deposit Request',
      }],
    };
    const payment = await paypal.payment.create(paypalPaymentObj);
    return `https://${data.ex1 === 'sandbox' ? 'sandbox' : 'www'}.paypal.com/checkoutnow/?token=${payment.id}`;
  } catch (err) {
    return err;
  }
};

exports.executePaymentPaypal = async (payerId, paymentId) => {
  const data = await Gateway.findOne({ where: { value: 'paypal' } });
  paypal.configure({
    mode: data.ex1,
    client_id: data.api_key,
    client_secret: data.secret_key,
  });
  const paymentData = await paypal.payment.get(paymentId);
  const paymentObj = {
    payer_id: payerId,
    transactions: paymentData.transactions,
  };
  const paymentExe = await paypal.payment.execute(paymentId, paymentObj);
  return paymentExe;
};
