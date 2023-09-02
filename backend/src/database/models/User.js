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
        }
    }

    User.init({
        cpf: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'User',
    });

    return User;
};