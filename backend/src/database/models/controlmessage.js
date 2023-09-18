'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ControlMessage extends Model {

    static associate(models) {

      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'controlMessage'
      });
    }
  }
  ControlMessage.init({
    userId: DataTypes.INTEGER,
    countMessages: DataTypes.INTEGER,
    lastMessage: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'ControlMessage',
  });
  return ControlMessage;
};