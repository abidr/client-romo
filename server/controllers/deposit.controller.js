/* eslint-disable camelcase */
const sequelizeQuery = require('sequelize-query');
const db = require('../config/db.config');
const mailer = require('../utils/mailer');

const queryParser = sequelizeQuery(db);
const Deposit = db.deposits;
const User = db.users;
const Log = db.logs;
const Setting = db.settings;
const Currency = db.currencies;

const { molliePayment } = require('../utils/payments/mollie');
const { coinbasePayment } = require('../utils/payments/coinbase');
const { coinPayments } = require('../utils/payments/coinpayments');
const { paypalPayment } = require('../utils/payments/paypal');
const { addBalance } = require('../utils/wallet');
const { stripePayment } = require('../utils/payments/stripe');

exports.getAllDeposits = async (req, res) => {
  const query = await queryParser.parse(req);
  try {
    const data = await Deposit.findAll({
      ...query,
      include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      }],
    });
    const count = await Deposit.count({
      ...query,
    });
    return res.json({ count, data });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getDepositById = async (req, res) => {
  const { id } = req.params;
  const query = await queryParser.parse(req);
  try {
    const data = await Deposit.findByPk(id, {
      ...query,
      where: {
        userId: req.user.id,
        ...query.where,
      },
      include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      }],
    });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getDepositByIdAdmin = async (req, res) => {
  const { id } = req.params;
  const query = await queryParser.parse(req);
  try {
    const data = await Deposit.findByPk(id, {
      ...query,
      include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      }],
    });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllDepositsByUser = async (req, res) => {
  const { id } = req.user;
  const query = await queryParser.parse(req);
  try {
    const data = await Deposit.findAll({
      ...query,
      where: {
        userId: id,
        ...query.where,
      },
      include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      }],
    });
    const count = await Deposit.count({
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

exports.createDeposit = async (req, res) => {
  const { id } = req.user;
  const { payment_method, amount, currency } = req.body;
  const user = await User.findByPk(id);
  try {
    let returnedObj;
    const currencyCustom = await Currency.findOne({ where: { symbol: currency } });
    const data = await Deposit.create({
      payment_method: (currency === 'USD' || currencyCustom?.custom) ? payment_method : 'coinpayments',
      amount,
      userId: id,
      currency,
    });

    if (currency === 'USD' || currencyCustom?.custom) {
      if (payment_method === 'mollie') {
        const payment = await molliePayment(currencyCustom?.custom ? amount * currencyCustom.rate_usd : amount, data.id, 'deposit');
        // eslint-disable-next-line no-underscore-dangle
        returnedObj = { ...data.dataValues, redirect: payment._links.checkout.href };
      } else if (payment_method === 'coinbase') {
        const payment = await coinbasePayment(currencyCustom?.custom ? amount * currencyCustom.rate_usd : amount, data.id, 'deposit');
        returnedObj = { ...data.dataValues, redirect: payment.hosted_url };
      } else if (payment_method === 'paypal') {
        const payment = await paypalPayment(currencyCustom?.custom ? amount * currencyCustom.rate_usd : amount, data.id, 'deposit');
        returnedObj = { ...data.dataValues, redirect: payment };
      } else if (payment_method === 'stripe') {
        const payment = await stripePayment(currencyCustom?.custom ? amount * currencyCustom.rate_usd : amount, data.id, 'deposit');
        returnedObj = { ...data.dataValues, redirect: payment };
      }
    } else {
      const payment = await coinPayments({
        symbol: currency,
        amount,
        id: data.id,
      }, user, 'deposit');
      returnedObj = { ...data.dataValues, redirect: payment.checkout_url };
    }
    await Log.create({ message: `User #${id} requested deposit of ${amount} via ${payment_method}` });
    return res.json(returnedObj);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.acceptDeposit = async (req, res) => {
  const { id } = req.params;
  try {
    const num = await Deposit.update({ status: 'success' }, { where: { id } });
    const ifUpdated = parseInt(num, 10);
    if (ifUpdated === 1) {
      const data = await Deposit.findByPk(id);
      const user = await User.findByPk(data.userId);
      const firstDeposit = await Deposit.findAll({ where: { userId: data.userId } });
      await addBalance(data.amount, data.currency, data.userId);
      await Log.create({ message: `Admin #${req.user.id} accepted deposit #${id}` });
      const refferal = await Setting.findOne({ where: { value: 'refferal' } });
      if (firstDeposit.length === 1 && refferal.param2 === 'ondeposit') {
        const referData = await User.findOne({ where: { id: user.reffered_by } });
        if (referData) {
          const referBalance = referData.balance_usd + parseFloat(refferal.param1, 10);
          await User.update({ balance_usd: referBalance }, { where: { id: referData.id } });
          await Log.create({ message: `User #${referData.id} rewarded ${refferal.param1} for reffering User #${data.userId}` });
        }
      }
      mailer({
        user: data.userId,
        subject: 'Deposit Accepted',
        message: `Your deposit of ${data.amount} ${data.currency} is successful and added to your account`,
      });
      return res.json({ message: 'Deposit Succeed' });
    }
    return res.status(500).json({ message: 'Could not update deposit' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.declineDeposit = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Deposit.findByPk(id);
    const num = await Deposit.update({ status: 'failed' }, { where: { id } });
    const ifUpdated = parseInt(num, 10);
    if (ifUpdated === 1) {
      await Log.create({ message: `Admin #${req.user.id} declined deposit #${id}` });
      return res.json({ message: 'Deposit Failed' });
    }
    mailer({
      user: data.userId,
      subject: 'Deposit Declined',
      message: `Your deposit of ${data.amount} ${data.currency} declined`,
    });
    return res.status(500).json({ message: 'Could not update deposit' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
