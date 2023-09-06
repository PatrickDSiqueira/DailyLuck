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
            });

            this.hasOne(models.DirectMessage, {
                foreignKey: 'teamId',
                as: 'directMessage'
            });
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