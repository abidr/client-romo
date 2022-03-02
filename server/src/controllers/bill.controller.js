const sequelizeQuery = require('sequelize-query');
const { customAlphabet } = require('nanoid');
const rp = require('request-promise');
const db = require('../config/db.config');
const mailer = require('../utils/mailer');
const { removeBalance } = require('../utils/wallet');

const queryParser = sequelizeQuery(db);
const Bill = db.bills;
const Setting = db.settings;
const Wallet = db.wallets;

exports.getAllBills = async (req, res) => {
  const query = await queryParser.parse(req);
  try {
    const data = await Bill.findAll({
      ...query,
      include: ['user'],
    });
    const count = await Bill.count({
      ...query,
    });
    return res.json({ count, data });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getAllBillsByUser = async (req, res) => {
  const query = await queryParser.parse(req);
  try {
    const data = await Bill.findAll({
      ...query,
      where: {
        ...query.where,
        userId: req.user.id,
      },
    });
    const count = await Bill.count({
      ...query,
      where: {
        ...query.where,
        userId: req.user.id,
      },
    });
    return res.json({ count, data });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.createTopUp = async (req, res) => {
  const { id } = req.user;
  const {
    number, amount, currency, country,
  } = req.body;

  try {
    const nanoId = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 12);
    const trxId = nanoId();

    const reloadly = await Setting.findOne({ where: { value: 'reloadly' } });
    const wallet = await Wallet.findOne({ where: { userId: id, currency } });

    if (!wallet) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    if (!(wallet.balance >= amount)) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    const accessToken = await rp({
      method: 'POST',
      uri: 'https://auth.reloadly.com/oauth/token',
      json: true,
      body: {
        client_id: reloadly.param1,
        client_secret: reloadly.param2,
        grant_type: 'client_credentials',
        audience: 'https://topups.reloadly.com',
      },
    });
    const detectOperator = await rp({
      method: 'GET',
      uri: `https://topups.reloadly.com/operators/auto-detect/phone/${number}/countries/${country.toUpperCase()}`,
      json: true,
      headers: {
        Authorization: `Bearer ${accessToken.access_token}`,
        'Content-Type': 'application/json',
        Accept: 'application/com.reloadly.topups-v1+json',
      },
    });
    const topUp = await rp({
      method: 'POST',
      uri: 'https://topups.reloadly.com/topups',
      json: true,
      body: {
        operatorId: `${detectOperator.operatorId}`,
        amount: `${amount - (amount * 0.10)}`,
        useLocalAmount: false,
        customIdentifier: trxId,
        recipientPhone: {
          countryCode: country,
          number,
        },
        senderPhone: {
          countryCode: 'CIV',
          number: '+2250708681438',
        },
      },
      headers: {
        Authorization: `Bearer ${accessToken.access_token}`,
        'Content-Type': 'application/json',
        Accept: 'application/com.reloadly.topups-v1+json',
      },
    });

    removeBalance(amount, currency, id);

    const data = await Bill.create({
      status: 'success',
      service: 'TopUp',
      narration: `Delivered ${topUp.deliveredAmount} ${topUp.deliveredAmountCurrencyCode} to ${topUp.recipientPhone}`,
      amount,
      currency,
      trxId,
      userId: id,
    });

    mailer({
      user: id,
      subject: 'TopUp Successful',
      message: `Delivered Amount: ${topUp.deliveredAmount} ${topUp.deliveredAmountCurrencyCode} <br/>
      Operator: ${topUp.operatorName} <br/>
      Amount Deducted: ${data.amount} ${data.currency} <br/>
      TRX ID: ${data.trxId}`,
    });

    return res.json(data);
  } catch (err) {
    if (err.response) {
      return res.status(400).json(err.response.body);
    }
    return res.status(400).json({ message: err.message });
  }
};
exports.topUpReview = async (req, res) => {
  const {
    number, amount, country,
  } = req.body;
  try {
    const reloadly = await Setting.findOne({ where: { value: 'reloadly' } });

    const accessToken = await rp({
      method: 'POST',
      uri: 'https://auth.reloadly.com/oauth/token',
      json: true,
      body: {
        client_id: reloadly.param1,
        client_secret: reloadly.param2,
        grant_type: 'client_credentials',
        audience: 'https://topups.reloadly.com',
      },
    });
    const detectOperator = await rp({
      method: 'GET',
      uri: `https://topups.reloadly.com/operators/auto-detect/phone/${number}/countries/${country.toUpperCase()}`,
      json: true,
      headers: {
        Authorization: `Bearer ${accessToken.access_token}`,
        'Content-Type': 'application/json',
        Accept: 'application/com.reloadly.topups-v1+json',
      },
    });
    const fxRates = await rp({
      method: 'POST',
      uri: 'https://topups.reloadly.com/operators/fx-rate',
      json: true,
      body: {
        operatorId: `${detectOperator.operatorId}`,
        amount,
      },
      headers: {
        Authorization: `Bearer ${accessToken.access_token}`,
        'Content-Type': 'application/json',
        Accept: 'application/com.reloadly.topups-v1+json',
      },
    });
    const fee = fxRates.fxRate * 0.10;
    const receiving = fxRates.fxRate - fee;
    return res.json({ ...fxRates, fee, receiving });
  } catch (err) {
    if (err.response) {
      return res.status(400).json(err.response.body);
    }
    return res.status(400).json({ message: err.message });
  }
};
exports.deleteBills = async (req, res) => {
  const { id } = req.params;

  try {
    const num = await Bill.destroy({ where: { id } });
    const ifDeleted = parseInt(num, 10);
    if (ifDeleted === 1) {
      return res.json({ message: 'Bill Deleted' });
    }
    return res.status(500).json({ message: 'Cannot delete bill' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
