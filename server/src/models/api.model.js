const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Api = sequelize.define('api', {
    secret: {
      type: DataTypes.STRING,
      unique: true,
    },
    public: {
      type: DataTypes.STRING,
      unique: true,
    },
  });
  return Api;
};
