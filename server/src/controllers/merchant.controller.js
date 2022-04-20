const sequelizeQuery = require('sequelize-query');
const { customAlphabet } = require('nanoid');
const db = require('../config/db.config');

const queryParser = sequelizeQuery(db);
const Merchant = db.merchants;
const User = db.users;
const Agent = db.agents;
const Setting = db.settings;

exports.getAllMerchants = async (req, res) => {
  const query = await queryParser.parse(req);
  try {
    const data = await Merchant.findAll({
      ...query,
      include: ['user'],
      where: {
        ...query.where,
      },
    });
    const count = await Merchant.count({
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

exports.getMerchantById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Merchant.findByPk(id, {
      include: ['user'],
    });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.createMerchant = async (req, res) => {
  const nanoId = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
  const merId = nanoId();
  const { userId } = req.body;
  try {
    const data = await Merchant.create({ merId, ...req.body });
    await User.update({ role: 2 }, { where: { id: userId } });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateMerchant = async (req, res) => {
  const { id } = req.user;

  try {
    const updateObj = {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
    };
    const num = await Merchant.update(updateObj, { where: { userId: id } });
    const ifUpdated = parseInt(num, 10);
    if (ifUpdated === 1) {
      return res.json({ message: 'Merchant Store Updated' });
    }
    return res.status(500).json({ message: 'Cannot update merchant store' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.updateMerchantAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const updateObj = {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      status: req.body.status,
      suspend: req.body.suspend,
    };
    const num = await Merchant.update(updateObj, { where: { id } });
    const ifUpdated = parseInt(num, 10);
    if (ifUpdated === 1) {
      return res.json({ message: 'Merchant Store Updated' });
    }
    return res.status(500).json({ message: 'Cannot update merchant store' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteMerchant = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Merchant.findByPk(id);
    const num = await Merchant.destroy({ where: { id } });
    User.update({ role: 1 }, { where: { id: data.userId } });
    const ifDeleted = parseInt(num, 10);
    if (ifDeleted === 1) {
      return res.json({ message: `User Deleted with id=${id}` });
    }
    return res.status(500).json({ message: `Cannot delete User with id=${id}` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteAgent = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Agent.findByPk(id);
    const num = await Agent.destroy({ where: { id } });
    User.update({ role: 1 }, { where: { id: data.userId } });
    const ifDeleted = parseInt(num, 10);
    if (ifDeleted === 1) {
      return res.json({ message: `User Deleted with id=${id}` });
    }
    return res.status(500).json({ message: `Cannot delete User with id=${id}` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createAgent = async (req, res) => {
  const nanoId = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
  const agentId = nanoId();
  const { userId } = req.body;
  try {
    const data = await Agent.create({ agentId, ...req.body });
    await User.update({ role: 3 }, { where: { id: userId } });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.confirmAgent = async (req, res) => {
  const { amount, agentId } = req.body;
  try {
    const agent = await Agent.findOne({ where: { agentId } });
    if (!agent) {
      return res.status(400).json({ message: 'Invalid Agent ID' });
    }
    const data = await Setting.findOne({ where: { value: 'adjustments' } });
    const fee = (parseFloat(data.param2, 10) / 100) * parseFloat(amount, 10);
    const total = fee + parseFloat(amount, 10);
    return res.json({ agent, fee, total: parseFloat(total, 10) });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
