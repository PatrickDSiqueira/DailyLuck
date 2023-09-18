const TeamRepository = require("../repositories/TeamRepository");

class TeamService {

    async getTeamList() {

        const listTeam = await TeamRepository.get();
        return {
            status: 200,
            listTeam
        };
    }
}

module.exports = new TeamService();