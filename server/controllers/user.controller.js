const sequelizeQuery = require('sequelize-query');
const bcrypt = require('bcrypt');
const db = require('../config/db.config');

const queryParser = sequelizeQuery(db);
const User = db.users;

exports.getAllUsers = async (req, res) => {
  const query = await queryParser.parse(req);
  try {
    const data = await User.findAll({
      ...query,
      where: {
        ...query.where,
      },
      attributes: { exclude: ['password'] },
    });
    const count = await User.count({
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

exports.getUserDetails = async (req, res) => {
  const { id } = req.user;
  try {
    const data = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    const referCount = await User.count({ where: { reffered_by: id } });
    return res.json({ ...data.dataValues, referCount });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    const referCount = await User.count({ where: { reffered_by: id } });
    return res.json({ ...data.dataValues, referCount });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.countUsers = async (req, res) => {
  try {
    const data = await User.count({
      where: {
        role: 1,
      },
    });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateUserAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    let updateObj;
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      updateObj = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        password: hashedPassword,
        perfect_money: req.body.perfect_money,
        payeer: req.body.payeer,
        paypal: req.body.paypal,
        mobile: req.body.mobile,
        paystack: req.body.paystack,
        balance_usd: req.body.balance_usd,
        role: req.body.role,
        active: req.body.active,
      };
    } else {
      updateObj = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        perfect_money: req.body.perfect_money,
        payeer: req.body.payeer,
        paypal: req.body.paypal,
        mobile: req.body.mobile,
        paystack: req.body.paystack,
        balance_usd: req.body.balance_usd,
        role: req.body.role,
        active: req.body.active,
      };
    }
    const num = await User.update(updateObj, { where: { id } });
    const ifUpdated = parseInt(num, 10);
    if (ifUpdated === 1) {
      return res.json({ message: 'User Updated' });
    }
    return res.status(500).json({ message: 'Cannot update user' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.user;

  try {
    let updateObj;
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      updateObj = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        password: hashedPassword,
        perfect_money: req.body.perfect_money,
        payeer: req.body.payeer,
        paypal: req.body.paypal,
        mobile: req.body.mobile,
        paystack: req.body.paystack,
      };
    } else {
      updateObj = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        perfect_money: req.body.perfect_money,
        payeer: req.body.payeer,
        paypal: req.body.paypal,
        mobile: req.body.mobile,
        paystack: req.body.paystack,
      };
    }
    const num = await User.update(updateObj, { where: { id } });
    const ifUpdated = parseInt(num, 10);
    if (ifUpdated === 1) {
      return res.json({ message: 'User Updated' });
    }
    return res.status(500).json({ message: 'Cannot update user' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const num = await User.destroy({ where: { id } });
    const ifDeleted = parseInt(num, 10);
    if (ifDeleted === 1) {
      return res.json({ message: `User Deleted with id=${id}` });
    }
    return res.status(500).json({ message: `Cannot delete User with id=${id}` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
