const paydunya = require('paydunya');
const db = require('../../config/db.config');

const Gateway = db.gateways;
const Setting = db.settings;

exports.payDunya = async (value, id) => {
  try {
    const data = await Gateway.findOne({ where: { value: 'paydunya' } });
    const appUrl = await Setting.findOne({ where: { value: 'appUrl' } });
    const site = await Setting.findOne({ where: { value: 'site' } });

    const setup = new paydunya.Setup({
      masterKey: data.ex1,
      token: data.ex2,
      privateKey: data.secretKey,
      publicKey: data.apiKey,
    });

    const store = new paydunya.Store({
      name: site.param1,
    });

    const invoice = new paydunya.CheckoutInvoice(setup, store);

    invoice.addItem(`Deposit Request #${id}`, 1, value, value);
    invoice.addCustomData('depositId', id);
    invoice.description = `Deposit Request #${id}`;
    invoice.returnURL = `${appUrl.param1}/add-money?status=success`;
    invoice.cancelURL = `${appUrl.param1}/add-money?status=failed`;
    invoice.totalAmount = value;

    await invoice.create();
    return invoice.url;
  } catch (err) {
    return err;
  }
};

exports.creditPayDunya = async (email, amount) => {
  try {
    const data = await Gateway.findOne({ where: { value: 'paydunya' } });

    const setup = new paydunya.Setup({
      masterKey: data.ex1,
      token: data.ex2,
      privateKey: data.secretKey,
      publicKey: data.apiKey,
      mode: 'test',
    });

    const directPay = new paydunya.DirectPay(setup);

    await directPay.creditAccount(email, amount);
    return directPay.responseText;
  } catch (err) {
    return err;
  }
};
