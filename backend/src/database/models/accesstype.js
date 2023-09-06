'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    class AccessType extends Model {

        static associate(models) {

            this.hasMany(models.User, {
                foreignKey: 'access_type_id',
                as: 'users',
            })
        }
    }

    AccessType.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'AccessType',
    });
    return AccessType;
};