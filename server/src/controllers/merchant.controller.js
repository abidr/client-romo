const sequelizeQuery = require('sequelize-query');
const db = require('../config/db.config');

const queryParser = sequelizeQuery(db);
const Merchant = db.merchants;

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
    const num = await Merchant.destroy({ where: { id } });
    const ifDeleted = parseInt(num, 10);
    if (ifDeleted === 1) {
      return res.json({ message: `User Deleted with id=${id}` });
    }
    return res.status(500).json({ message: `Cannot delete User with id=${id}` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
