const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Agent = sequelize.define('agent', {
    agentId: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.TEXT,
    },
    suspend: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  return Agent;
};
