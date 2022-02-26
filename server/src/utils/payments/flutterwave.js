const rp = require('request-promise');
const db = require('../../config/db.config');

const Gateway = db.gateways;
const Setting = db.settings;

exports.flutterWavePayment = async (data, user) => {
  try {
    const gateway = await Gateway.findOne({ where: { value: 'flutterwave' } });
    const apiUrl = await Setting.findOne({ where: { value: 'apiUrl' } });

    const response = await rp({
      method: 'POST',
      uri: 'https://api.flutterwave.com/v3/payments',
      json: true,
      body: {
        tx_ref: `${data.id}`,
        amount: data.amount,
        currency: data.currency,
        redirect_url: `${apiUrl.param1}/payments/flutterwave`,
        customer: {
          email: user.email,
          phonenumber: user.phone,
          name: user.name,
        },
      },
      headers: {
        Authorization: `Bearer ${gateway.secretKey}`,
      },
    });

    return response.data.link;
  } catch (err) {
    return err;
  }
};
