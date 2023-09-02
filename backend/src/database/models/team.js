'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    class Team extends Model {

        static associate(models) {

            this.hasMany(models.User, {
                foreignKey: 'team_id',
                as: 'users',
            })
        }
    }

    Team.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Team',
    });
    return Team;
};