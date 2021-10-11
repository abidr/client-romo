const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Exchange = sequelize.define('exchange', {
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
    from: {
      type: DataTypes.STRING,
      defaultValue: 'USD',
    },
    to: {
      type: DataTypes.STRING,
      defaultValue: 'BTC',
    },
    exchange_rate: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.00,
    },
    amount_from: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.00,
    },
    amount_to: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.00,
    },
    fee: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.00,
    },
    total: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.00,
    },
  });
  return Exchange;
};
