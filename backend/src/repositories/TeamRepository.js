const {Team} = require('../database/models')

class TeamRepository {

    async get() {

        try {

            return await Team.findAll({
                attributes: ['id', 'name']
            });

        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = new TeamRepository();