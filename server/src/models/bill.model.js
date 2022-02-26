const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Bill = sequelize.define('bill', {
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
    service: {
      type: DataTypes.STRING,
    },
    narration: {
      type: DataTypes.STRING,
    },
    trxId: {
      type: DataTypes.STRING,
      unique: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.00,
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'USD',
    },
  });
  return Bill;
};
