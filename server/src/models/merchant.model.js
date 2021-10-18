const { DataTypes } = require('sequelize');
const { customAlphabet } = require('nanoid');

module.exports = (sequelize) => {
  const nanoId = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
  const merId = nanoId();
  const Merchant = sequelize.define('merchant', {
    merId: {
      type: DataTypes.STRING,
      defaultValue: merId,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
    proof: {
      type: DataTypes.STRING,
    },
  });
  return Merchant;
};
