const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Buy = sequelize.define('buy', {
    currency: {
      type: DataTypes.STRING,
    },
    symbol: {
      type: DataTypes.STRING,
    },
    rate: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.DOUBLE,
    },
    fee: {
      type: DataTypes.DOUBLE,
    },
    subtotal: {
      type: DataTypes.DOUBLE,
    },
    total: {
      type: DataTypes.DOUBLE,
    },
    wallet_id: {
      type: DataTypes.STRING,
    },
    payment_method: {
      type: DataTypes.STRING,
    },
    payment_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  return Buy;
};
