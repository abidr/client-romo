const db = require('../config/db.config');

const User = db.users;
const Wallet = db.wallets;

exports.addBalance = async (amount, currency, userId) => {
  let result;
  let error;
  try {
    if (currency === 'USD') {
      const user = await User.findByPk(userId);
      const newBalance = amount + user.balance_usd;
      await User.update({ balance_usd: newBalance }, { where: { id: userId } });
    } else {
      const data = await Wallet.findOne({ where: { userId, currency } });
      if (data) {
        const newBalance = data.balance + amount;
        await Wallet.update({ balance: newBalance }, { where: { userId, currency } });
      } else {
        await Wallet.create({ balance: amount, currency, userId });
      }
    }
    result = 'Balance Updated';
  } catch (err) {
    error = err.message;
  }
  return { result, error };
};

exports.removeBalance = async (amount, currency, userId) => {
  let result;
  let error;
  try {
    if (currency === 'USD') {
      const user = await User.findByPk(userId);
      const newBalance = user.balance_usd - amount;
      await User.update({ balance_usd: newBalance }, { where: { id: userId } });
    } else {
      const data = await Wallet.findOne({ where: { userId, currency } });
      if (data) {
        const newBalance = data.balance - amount;
        await Wallet.update({ balance: newBalance }, { where: { userId, currency } });
      }
    }
    result = 'Balance Updated';
  } catch (err) {
    error = err.message;
  }
  return { result, error };
};
