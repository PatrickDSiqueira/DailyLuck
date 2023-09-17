const UserRepository = require('../repositories/UserRepository')
const Helper = require('../Helpers/Helper');
const DirectMessageRepository = require("../repositories/DirectMessageRepository");

class UserController {

    async create(req, res) {

        const {cpf, first_name, last_name, team_id} = req.body;

        if (!cpf) {

            return res.status(400).json({

                error: 'The cpf is missing from the request.'
            });
        }

        const cpfValidate = Helper.validateCPF(cpf);

        if (!cpfValidate) {

            return res.status(400).json({
                error: 'The cpf is not right.'
            });
        }

        if (!await UserRepository.checkCpf(cpfValidate)) {

            return res.status(400).json({
                error: 'The cpf is used.'
            });
        }

        if (!first_name || !last_name || !team_id) {
            return res.status(400).json({
                error: 'Without Parameters required.'
            });
        }

        const user = await UserRepository.createUser(cpf, first_name, last_name, 1, team_id);

        if (user) {

            return res.status(200).json({
                firstName: user.firstName,
                lastName: user.lastName
            });

        } else {

            return res.status(400).json({
                error: 'Error in create User.'
            });
        }
    }

    async get(req, res) {

        try {

            const {user_id} = req;

            const currentUser = await UserRepository.getUserById(user_id);

            if (await UserRepository.isAdmin(currentUser) === false) {

                return res.status(403)
                    .json({error: 'you dont have access'});
            }

            const userList = await UserRepository.getAllUsers();

            return res.status(200).json(userList)

        } catch (error) {

            console.error(error)

            return res.status(500).json({error: 'Internal error'})
        }
    }

    async update(req, res) {

        try {

            const {user_id} = req;
            const {id, actual_status} = req.body;

            const currentUser = await UserRepository.getUserById(user_id);

            if (await UserRepository.isAdmin(currentUser) === false) {

                return res.status(403)
                    .json({error: 'you dont have access'});
            }

            if (!id) {

                return res.status(400).json({error: 'Identification user is required'})
            }

            const user = await UserRepository.getUserById(id);

            if (!user) {

                return res.status(404).json({error: 'User no found'})
            }

            if (user.isActive) {

                await UserRepository.inactiveUser(user);

            } else {

                await UserRepository.activeUser(user);
            }

            return res.status(200).json({message: 'user update successful'})

        } catch (error) {

            console.error(error)

            return res.status(500).json({error: 'Internal error'})
        }
    }

    async createLeader(req, res) {

        try {

            const {user_id} = req;

            const currentUser = await UserRepository.getUserById(user_id);

            if (await UserRepository.isAdmin(currentUser) === false) {

                return res.status(403)
                    .json({error: 'you dont have access'});
            }

            const {cpf, first_name, last_name, team_id} = req.body;

            if (!cpf) {

                return res.status(400).json({

                    error: 'The cpf is missing from the request.'
                });
            }

            const cpfValidate = Helper.validateCPF(cpf);

            if (!cpfValidate) {

                return res.status(400).json({
                    error: 'The cpf is not right.'
                });
            }

            if (!await UserRepository.checkCpf(cpfValidate)) {

                return res.status(400).json({
                    error: 'The cpf is used.'
                });
            }
            if (!await UserRepository.thereIsTeam(team_id)) {

                return res.status(400).json({
                    error: 'Team not found.'
                });
            }

            if (!first_name || !last_name) {
                return res.status(400).json({
                    error: 'Without first or last name.'
                });
            }

            const user = await UserRepository.createLeader(cpf, first_name, last_name, team_id);

            if (user) {

                return res.status(200).json({
                    firstName: user.firstName,
                    lastName: user.lastName
                });

            } else {

                return res.status(400).json({
                    error: 'Error in create User.'
                });
            }

        } catch (error) {

            console.error(error)

            return res.status(500).json({error: 'Internal error'})
        }

    }

}


module.exports = new UserController();