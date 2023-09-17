const UserService = require("../services/UserService");

class UserController {

    async create(req, res) {

        try {

            const {cpf, first_name, last_name, team_id} = req.body;
            const result = await UserService.createUserEmployees({
                cpf,
                firstName: first_name,
                lastName: last_name,
                teamId: team_id
            });
            return res.status(result.status).json(result);

        } catch (e) {

            console.error(e.message);
            return res.status(500).json({error: 'Internal error'})

        }
    }

    async get(req, res) {

        try {

            const {user_id} = req;
            const result = await UserService.getUserList(user_id);
            return res.status(result.status).json(result);

        } catch (error) {

            console.error(error.message)
            return res.status(500).json({error: 'Internal error'})
        }
    }

    async update(req, res) {

        try {

            const {user_id} = req;
            const {id} = req.body;
            const result = await UserService.changeActive(user_id, id);
            return res.status(result.status).json(result);

        } catch (error) {

            console.error(error.message)
            return res.status(500).json({error: 'Internal error'})
        }
    }

    async createLeader(req, res) {

        try {

            const {user_id} = req;
            const {cpf, first_name, last_name, team_id} = req.body
            const result = await UserService.createUserLeader(user_id, cpf, first_name, last_name, team_id);
            return res.status(result.status).json(result);

        } catch (error) {

            console.error(error.message)
            return res.status(500).json({error: 'Internal error'})
        }
    }
}


module.exports = new UserController();