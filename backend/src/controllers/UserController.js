const UserRepository = require('../repositories/UserRepository')
const Helper = require('../Helpers/Helper');

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

        if (!first_name ||  !last_name  || !team_id){
            return res.status(400).json({
                error: 'Without Parameters required.'
            });
        }

        const user = await UserRepository.createUser(cpf, first_name, last_name, 1, team_id);

        if (user) {

            return res.status(200).json({
                firstName : user.firstName,
                lastName : user.lastName
            });

        } else {

            return res.status(400).json({
                error: 'Error in create User.'
            });
        }
    }
}


module.exports = new UserController();