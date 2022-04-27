const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ApiOtp = sequelize.define('apiOtp', {
    trxId: {
      type: DataTypes.STRING,
      unique: true,
    },
    otp: {
      type: DataTypes.STRING,
    },
    expires: {
      type: DataTypes.STRING,
    },
  });
  return ApiOtp;
};
