const coinbase = require('coinbase-commerce-node');
const db = require('../../config/db.config');

const Gateway = db.gateways;
const Setting = db.settings;

exports.coinbasePayment = async (value, id, type) => {
  try {
    const data = await Gateway.findOne({ where: { value: 'coinbase' } });
    const appUrl = await Setting.findOne({ where: { value: 'app_url' } });
    const { Client } = coinbase;
    Client.init(data.api_key);
    const { Charge } = coinbase.resources;

    const payment = await Charge.create({
      name: type === 'deposit' ? `Deposit #${id}` : `Buy #${id}`,
      description: type === 'deposit' ? 'Deposit Request to Wallet' : 'Buy Request',
      pricing_type: 'fixed_price',
      metadata: { id, type },
      local_price: {
        amount: value.toFixed(2),
        currency: 'USD',
      },
      redirect_url: type === 'deposit' ? `${appUrl.param1}/deposits` : `${appUrl.param1}/buy-sell`,
      cancel_url: type === 'deposit' ? `${appUrl.param1}/deposits` : `${appUrl.param1}/buy-sell`,
    });
    return payment;
  } catch (err) {
    return err;
  }
};
