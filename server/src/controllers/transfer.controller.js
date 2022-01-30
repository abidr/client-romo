const sequelizeQuery = require('sequelize-query');
const { customAlphabet } = require('nanoid');
const db = require('../config/db.config');
const mailer = require('../utils/mailer');

const { addBalance, removeBalance } = require('../utils/wallet');

const queryParser = sequelizeQuery(db);
const Transfer = db.transfers;
const User = db.users;
const Log = db.logs;
const Wallet = db.wallets;
const Currency = db.currencies;

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
    const nanoId = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 12);
    const trxId = nanoId();

    const sendingUser = await User.findByPk(id);

    const wallet = await Wallet.findOne({ where: { userId: id, currency } });
    const curData = await Currency.findOne({ where: { symbol: currency } });

    if (!sendingUser.kyc) {
      return res.status(403).json({ message: 'Please verify KYC to debit from account' });
    }

    if (!wallet) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    if (!(wallet.balance >= amount)) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    const receivingWallet = parseInt(email.slice(1), 10);
    const receivingUserId = receivingWallet - 150000 - curData.id;
    const receivingUser = await User.findOne({ where: { id: receivingUserId } });

    if (receivingUser) {
      await addBalance(amount, currency, receivingUser.id);
      await removeBalance(amount, currency, id);
    } else {
      return res.status(400).json({ message: 'User not found' });
    }

    const data = await Transfer.create({
      type: 'send',
      amount,
      currency,
      email,
      trxId,
      userId: id,
    });

    await Transfer.create({
      type: 'receive',
      amount,
      currency,
      email: sendingUser.email,
      trxId,
      userId: receivingUser.id,
    });

    mailer({
      user: id,
      subject: 'Send Transfer',
      message: `You sent ${data.amount} ${data.currency} to ${data.email}`,
    });

    mailer({
      user: receivingUser.id,
      subject: 'Received Transfer',
      message: `You received ${data.amount} ${data.currency} from ${sendingUser.email}`,
    });

    await Log.create({ message: `User #${id} transferred ${amount} ${currency} to User #${receivingUser.id}` });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
