/* eslint-disable camelcase */
const sequelizeQuery = require('sequelize-query');
const db = require('../config/db.config');
const mailer = require('../utils/mailer');

const queryParser = sequelizeQuery(db);
const Exchange = db.exchanges;
const User = db.users;
const Log = db.logs;
const Setting = db.settings;
const Currency = db.currencies;
const Wallet = db.wallets;

const { addBalance, removeBalance } = require('../utils/wallet');

exports.getAllExchanges = async (req, res) => {
  const query = await queryParser.parse(req);
  try {
    const data = await Exchange.findAll({
      ...query,
    });
    const count = await Exchange.count({
      ...query,
    });
    return res.json({ count, data });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getExchangeById = async (req, res) => {
  const { id } = req.params;
  const query = await queryParser.parse(req);
  try {
    const data = await Exchange.findByPk(id, {
      ...query,
      where: {
        userId: req.user.id,
        ...query.where,
      },
    });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getExchangeByIdAdmin = async (req, res) => {
  const { id } = req.params;
  const query = await queryParser.parse(req);
  try {
    const data = await Exchange.findByPk(id, {
      ...query,
    });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllExchangesByUser = async (req, res) => {
  const { id } = req.user;
  const query = await queryParser.parse(req);
  try {
    const data = await Exchange.findAll({
      ...query,
      where: {
        userId: id,
        ...query.where,
      },
    });
    const count = await Exchange.count({
      ...query,
      where: {
        userId: id,
        ...query.where,
      },
    });
    return res.json({ count, data });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createExchange = async (req, res) => {
  const { id } = req.user;
  const { from, to, amountFrom } = req.body;
  try {
    const currencyFrom = await Currency.findOne({ where: { symbol: from } });
    const currencyTo = await Currency.findOne({ where: { symbol: to } });
    const fromPriceUsd = from === 'USD' ? 1.0 : currencyFrom.rate_usd;
    const toPriceUsd = to === 'USD' ? 1.0 : currencyTo.rate_usd;
    const exchangeRate = fromPriceUsd / toPriceUsd;
    const user = await User.findByPk(id);
    const adjustments = await Setting.findOne({ where: { value: 'adjustments' } });
    const amountTo = amountFrom * exchangeRate;
    const fee = amountFrom * (parseFloat(adjustments.param1, 10) / 100);
    const total = amountFrom + fee;

    if (from === 'USD') {
      if (!(user.balance_usd >= total)) {
        return res.status(404).json({
          message: 'Insufficient balance',
        });
      }
    } else {
      const wallet = await Wallet.findOne({ where: { userId: id, currency: from } });
      if (!(wallet.balance >= total)) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }
    }

    await removeBalance(total, from, id);
    await Exchange.create({
      userId: id,
      from,
      to,
      exchange_rate: exchangeRate,
      amount_from: amountFrom,
      amount_to: amountTo,
      fee,
      total,
    });

    await Log.create({ message: `User #${id} requested exchange of ${amountFrom} ${from} to ${amountTo} ${to}` });
    return res.json({ message: 'Exchange Request Sent' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.acceptExchange = async (req, res) => {
  const { id } = req.params;
  try {
    const exchange = await Exchange.findOne({ where: { id } });
    const num = await Exchange.update({ status: 'success' }, { where: { id } });
    const ifUpdated = parseInt(num, 10);
    if (ifUpdated === 1) {
      await addBalance(exchange.amount_to, exchange.to, exchange.userId);
      await Log.create({ message: `Admin #${req.user.id} accepted Exchange #${id}` });
      return res.json({ message: 'Exchange Succeed' });
    }
    mailer({
      user: exchange.userId,
      subject: 'Exchange Accepted',
      message: `Your exchange request of ${exchange.amount_from} ${exchange.from} to ${exchange.amount_to} ${exchange.to} has been accepted`,
    });

    return res.status(500).json({ message: 'Could not update exchange' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.declineExchange = async (req, res) => {
  const { id } = req.params;
  try {
    const exchange = await Exchange.findOne({ where: { id } });
    const num = await Exchange.update({ status: 'failed' }, { where: { id } });
    const ifUpdated = parseInt(num, 10);
    if (ifUpdated === 1) {
      await addBalance(exchange.total, exchange.from, exchange.userId);
      await Log.create({ message: `Admin #${req.user.id} declined Exchange #${exchange.id}` });
      return res.json({ message: 'Exchange Failed' });
    }
    mailer({
      user: exchange.userId,
      subject: 'Exchange Declined',
      message: `Your exchange request #${exchange.id} has been declined`,
    });

    return res.status(500).json({ message: 'Could not update exchange' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
