const { createMollieClient } = require('@mollie/api-client');
const db = require('../../config/db.config');

const Gateway = db.gateways;
const Setting = db.settings;

exports.molliePayment = async (value, id, type) => {
  try {
    const data = await Gateway.findOne({ where: { value: 'mollie' } });
    const appUrl = await Setting.findOne({ where: { value: 'app_url' } });
    const apiUrl = await Setting.findOne({ where: { value: 'api_url' } });
    const mollieClient = createMollieClient({ apiKey: data.api_key });
    const payment = await mollieClient.payments.create({
      amount: {
        value: value.toFixed(2),
        currency: 'USD',
      },
      metadata: { id, type },
      description: type === 'deposit' ? 'Deposit Request' : 'Exchange Request',
      redirectUrl: type === 'deposit' ? `${appUrl.param1}/deposits` : `${appUrl.param1}/buy-sell`,
      webhookUrl: `${apiUrl.param1}/payments/mollie`,
    });
    return payment;
  } catch (err) {
    return err;
  }
};
