const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    balance_usd: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.00,
    },
    reffered_by: {
      type: DataTypes.INTEGER,
    },
    reset: {
      type: DataTypes.STRING,
    },
  });
  return User;
};
