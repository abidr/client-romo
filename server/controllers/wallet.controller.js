const db = require('../config/db.config');

const Wallet = db.wallets;
const Currency = db.currencies;
const User = db.users;

exports.getWallet = async (req, res) => {
  try {
    const wallet = [];
    const data = await Wallet.findAll({ where: { userId: req.user.id } });
    const currencies = await Currency.findAll({ where: { active: true } });
    const user = await User.findOne({ where: { id: req.user.id } });
    wallet.push({ balance: user.balance_usd, currency: 'USD' });
    await currencies.forEach((item) => {
      const balance = data.find((x) => x.currency === item.symbol);
      wallet.push({ balance: balance?.balance || 0.00, currency: item.symbol });
    });
    res.json(wallet);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
