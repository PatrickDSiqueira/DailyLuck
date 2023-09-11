const TeamRepository = require('../repositories/TeamRepository');

class TeamController {

    async get(req, res) {

        const listTeam = await TeamRepository.get();
        return res.status(200).json(listTeam);
    }
}

module.exports = new TeamController();