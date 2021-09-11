const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Setting = sequelize.define('setting', {
    value: {
      type: DataTypes.STRING,
    },
    param1: {
      type: DataTypes.STRING,
    },
    param2: {
      type: DataTypes.STRING,
    },
  });
  return Setting;
};
