const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const AgentTrx = sequelize.define('agentTrx', {
    status: {
      type: DataTypes.STRING,
      defaultValue: 'success',
    },
    userEmail: {
      type: DataTypes.STRING,
    },
    currency: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.DOUBLE,
    },
  });
  return AgentTrx;
};
