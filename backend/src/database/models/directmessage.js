'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DirectMessage extends Model {

        static associate(models) {
            this.belongsTo(models.Team);
        }
    }

    DirectMessage.init({
        teamId: DataTypes.INTEGER,
        message: DataTypes.STRING,
        deleted: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'DirectMessage',
    });
    return DirectMessage;
};