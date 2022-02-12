const db = require('../../config/db.config');

const Gateway = db.gateways;
const Setting = db.settings;

exports.PerfectMoney = async (value, id, currency) => {
  try {
    const data = await Gateway.findOne({ where: { value: 'perfectmoney' } });
    const appUrl = await Setting.findOne({ where: { value: 'appUrl' } });
    const site = await Setting.findOne({ where: { value: 'site' } });

    const payment = {
      amount: value,
      depositId: id,
      currency,
      usdWallet: data?.ex1,
      eurWallet: data?.ex2,
      appUrl,
      site,
    };

    return payment;
  } catch (err) {
    return err;
  }
};
