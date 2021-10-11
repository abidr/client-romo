const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Deposit = sequelize.define('deposit', {
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
    payment_method: {
      type: DataTypes.STRING,
    },
    payment_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    amount: {
      type: DataTypes.FLOAT,
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'USD',
    },
  });
  return Deposit;
};
