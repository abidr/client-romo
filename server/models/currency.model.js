const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Currency = sequelize.define('currency', {
    name: {
      type: DataTypes.STRING,
    },
    symbol: {
      type: DataTypes.STRING,
    },
    icon: {
      type: DataTypes.STRING,
    },
    rate_usd_prev: {
      type: DataTypes.DOUBLE,
    },
    rate_usd: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.00,
    },
    rate_from_api: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    custom: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    metadata: {
      type: DataTypes.TEXT,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    wallet_id: {
      type: DataTypes.STRING,
    },
  });
  return Currency;
};
