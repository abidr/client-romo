const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ApiPayment = sequelize.define('apiPayment', {
    trxId: {
      type: DataTypes.STRING,
      unique: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
    amount: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.00,
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'USD',
    },
    customIdentifier: {
      type: DataTypes.STRING,
      unique: true,
    },
    logo: {
      type: DataTypes.STRING,
    },
    callbackUrl: {
      type: DataTypes.STRING,
    },
    successUrl: {
      type: DataTypes.STRING,
    },
    failedUrl: {
      type: DataTypes.STRING,
    },
    paidBy: {
      type: DataTypes.STRING,
    },
    test: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  return ApiPayment;
};
