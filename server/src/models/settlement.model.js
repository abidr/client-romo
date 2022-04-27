const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Settlement = sequelize.define('settlement', {
    status: {
      type: DataTypes.STRING,
      defaultValue: 'success',
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'credit',
    },
    currency: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.DOUBLE,
    },
  });
  return Settlement;
};
