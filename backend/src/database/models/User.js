'use strict';
const {
    Model, DataTypes
} = require('sequelize');

module.exports = (sequelize) => {

    class User extends Model {

        static associate(models) {

            this.belongsTo(models.Team, {
                foreignKey: 'team_id',
                as: 'team'
            });

            this.belongsTo(models.AccessType, {
                foreignKey: 'access_type_id',
                as: 'accessType'
            });

            this.hasOne(models.ControlMessage, {
                foreignKey: 'userId',
                as: 'controlMessage'
            });
        }
    }

    User.init({
        cpf: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        access_type_id: DataTypes.INTEGER,
        team_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'User',
    });

    return User;
};