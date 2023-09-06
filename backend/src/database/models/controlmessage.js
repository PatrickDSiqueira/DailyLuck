'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ControlMessage extends Model {

    static associate(models) {
      this.belongsTo(models.User);
    }
  }
  ControlMessage.init({
    userId: DataTypes.INTEGER,
    countMessages: DataTypes.INTEGER,
    lastMessage: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'ControlMessage',
  });
  return ControlMessage;
};