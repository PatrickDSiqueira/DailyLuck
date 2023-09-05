'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ControlMessage extends Model {

    static associate(models) {
      this.belongsTo(models.User)
      // define association here
    }
  }
  ControlMessage.init({
    userId: DataTypes.INTEGER,
    countMessages: DataTypes.INTEGER,
    lastMessage: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ControlMessage',
  });
  return ControlMessage;
};