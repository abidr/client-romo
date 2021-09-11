/* eslint-disable camelcase */
const sequelizeQuery = require('sequelize-query');
const db = require('../config/db.config');
const mailer = require('../utils/mailer');

const queryParser = sequelizeQuery(db);
const Withdraw = db.withdraws;
const User = db.users;
const Setting = db.settings;
const Log = db.logs;
const Wallet = db.wallets;

const { addBalance, removeBalance } = require('../utils/wallet');

exports.getAllWithdraws = async (req, res) => {
  const query = await queryParser.parse(req);
  try {
    const data = await Withdraw.findAll({
      ...query,
      include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      }],
    });
    const count = await Withdraw.count({
      ...query,
      where: {
        ...query.where,
      },
    });
    return res.json({ count, data });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getWithdrawById = async (req, res) => {
  const { id } = req.params;
  const query = await queryParser.parse(req);
  try {
    const data = await Withdraw.findByPk(id, {
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

exports.getWithdrawByIdAdmin = async (req, res) => {
  const { id } = req.params;
  const query = await queryParser.parse(req);
  try {
    const data = await Withdraw.findByPk(id, {
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

exports.getAllWithdrawsByUser = async (req, res) => {
  const { id } = req.user;
  const query = await queryParser.parse(req);
  try {
    const data = await Withdraw.findAll({
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
    const count = await Withdraw.count({
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

exports.createWithdraw = async (req, res) => {
  const { id } = req.user;
  const {
    payment_method, amount, currency, wallet_id,
  } = req.body;
  try {
    const user = await User.findByPk(id);
    if (currency === 'USD') {
      if (!user[payment_method]) {
        return res.status(404).json({
          message: `Connect your ${payment_method} account first from settings`,
        });
      }
    }

    const withdrawFee = await Setting.findOne({ where: { value: 'withdraw_fee' } });

    const calculateFee = amount * (withdrawFee.param1 / 100);

    const calculateAmount = withdrawFee.param2 === 'fixed' ? parseFloat(amount, 10) + parseFloat(withdrawFee.param1, 10) : parseFloat(amount, 10) + parseFloat(calculateFee, 10);

    if (currency === 'USD') {
      if (!(user.balance_usd >= calculateAmount)) {
        return res.status(404).json({
          message: 'Insufficient balance',
        });
      }
    } else {
      const wallet = await Wallet.findOne({ where: { userId: id, currency } });
      if (!(wallet.balance >= calculateAmount)) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }
    }

    const data = await Withdraw.create({
      payment_method: currency === 'USD' ? payment_method : `${currency} Wallet`,
      amount,
      currency,
      fee: withdrawFee.param2 === 'fixed' ? parseFloat(withdrawFee.param1, 10) : calculateFee,
      total: calculateAmount,
      wallet_id: currency === 'USD' ? user[payment_method] : wallet_id,
      userId: id,
    });
    await Log.create({ message: `User #${id} requested withdrawal of ${amount} ${currency}` });
    await removeBalance(calculateAmount, currency, id);
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.acceptWithdraw = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Withdraw.findByPk(id);
    const num = await Withdraw.update({ status: 'success' }, { where: { id } });
    const ifUpdated = parseInt(num, 10);
    if (ifUpdated === 1) {
      mailer({
        user: data.userId,
        subject: 'Withdraw Accepted',
        message: `Your withdraw request of ${data.total} has been accepted and sent to your ${data.payment_method}`,
      });
      await Log.create({ message: `Admin #${req.user.id} accepted withdrawal #${id}` });
      return res.json({ message: 'Withdraw Succeed' });
    }
    return res.status(500).json({ message: 'Could not update withdraw' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.declineWithdraw = async (req, res) => {
  const { id } = req.params;
  try {
    const num = await Withdraw.update({ status: 'failed' }, { where: { id } });
    const ifUpdated = parseInt(num, 10);
    if (ifUpdated === 1) {
      const data = await Withdraw.findByPk(id);
      await addBalance(data.total, data.currency, data.userId);
      mailer({
        user: data.userId,
        subject: 'Withdraw Declined',
        message: `Your withdraw request of ${data.total} ${data.currency} has been declined and balance reversed to your wallet`,
      });
      await Log.create({ message: `Admin #${req.user.id} declined withdrawal #${id}` });
      return res.json({ message: 'Withdraw Failed' });
    }
    return res.status(500).json({ message: 'Could not update withdraw' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
