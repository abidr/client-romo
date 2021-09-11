const sequelizeQuery = require('sequelize-query');
const db = require('../config/db.config');
const mailer = require('../utils/mailer');

const { addBalance, removeBalance } = require('../utils/wallet');

const queryParser = sequelizeQuery(db);
const Transfer = db.transfers;
const User = db.users;
const Log = db.logs;
const Wallet = db.wallets;

exports.getAllTransfers = async (req, res) => {
  const query = await queryParser.parse(req);
  try {
    const data = await Transfer.findAll({
      ...query,
      include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      }],
    });
    const count = await Transfer.count({
      ...query,
    });
    return res.json({ count, data });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllTransfersByUser = async (req, res) => {
  const { id } = req.user;
  const query = await queryParser.parse(req);
  try {
    const data = await Transfer.findAll({
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
    const count = await Transfer.count({
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

exports.createTransfer = async (req, res) => {
  const { id } = req.user;
  const { amount, currency, email } = req.body;
  try {
    const sendingUser = await User.findByPk(id);

    if (currency === 'USD') {
      if (!(sendingUser.balance_usd >= amount)) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }
    } else {
      const wallet = await Wallet.findOne({ where: { userId: id, currency } });
      if (!(wallet.balance >= amount)) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }
    }

    const receivingUser = await User.findOne({ where: { email } });

    if (receivingUser) {
      await addBalance(amount, currency, receivingUser.id);
      await removeBalance(amount, currency, id);
    } else {
      return res.status(500).json({ message: 'User not found' });
    }

    const data = await Transfer.create({
      type: 'send',
      amount,
      currency,
      email,
      userId: id,
    });

    await Transfer.create({
      type: 'receive',
      amount,
      currency,
      email: sendingUser.email,
      userId: receivingUser.id,
    });

    mailer({
      user: id,
      subject: 'Send Transfer',
      message: `You sent ${data.amount} ${data.currency} to ${data.email}`,
    });

    mailer({
      user: receivingUser.id,
      subject: 'Receive Transfer',
      message: `You received ${data.amount} ${data.currency} from ${sendingUser.email}`,
    });

    await Log.create({ message: `User #${id} transferred ${amount} ${currency} to User #${receivingUser.id}` });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
