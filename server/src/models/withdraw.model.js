const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Withdraw = sequelize.define('withdraw', {
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
    payment_method: {
      type: DataTypes.STRING,
    },
    wallet_id: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.DOUBLE,
    },
    currency: {
      type: DataTypes.STRING,
    },
    fee: {
      type: DataTypes.DOUBLE,
    },
    total: {
      type: DataTypes.DOUBLE,
    },
  });
  return Withdraw;
};
