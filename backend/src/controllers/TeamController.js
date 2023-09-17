const TeamService = require('../services/TeamService');

class TeamController {

    async get(req, res) {

        try {

            const result = await TeamService.getTeamList();
            return res.status(result.status).json(result);

        } catch (e) {

            console.log(e.message);
            return res.status(500).json({error: 'Internal error'})
        }
    }
}

module.exports = new TeamController();