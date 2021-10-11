const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Gateway = sequelize.define('gateway', {
    name: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.STRING,
    },
    api_key: {
      type: DataTypes.STRING,
    },
    secret_key: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    isCrypto: {
      type: DataTypes.BOOLEAN,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
    isExchangePayment: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ex1: {
      type: DataTypes.STRING,
    },
    ex2: {
      type: DataTypes.STRING,
    },
  });
  return Gateway;
};
