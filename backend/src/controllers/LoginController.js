const {User, Team, AccessType} = require('../database/models');
const jwt = require('jsonwebtoken');
const config = require('../config/Auth');
const UserRepository = require('../repositories/UserRepository');

class LoginController {

    async index(req, res) {

        const {cpf} = req.body;

        const userExist = await User.findOne({
            where: {cpf},
            include: [
                {
                    model: Team,
                    as: 'team',
                },
                {
                    model: AccessType,
                    as: 'accessType',
                },
            ]
        });

        if (!userExist) {

            return res.status(400).json({
                error: "User dont exist"
            });
        }

        if (!userExist.isActive) {

            return res.status(400).json({
                error: "Access blocked. Contact your administrator"
            });
        }

        let payload = {
            id: userExist.id,
            firstName: userExist.firstName,
            lastName: userExist.lastName,
            isLeader: await UserRepository.isLeader(userExist),
            isAdmin: await UserRepository.isAdmin(userExist),
            isEmployees: await UserRepository.isEmployees(userExist),
        }

        return res.status(200).json({
            user: {
                name: userExist.name,
                email: userExist.team
            },
            token: jwt.sign(
                payload,
                config.secret,
                {expiresIn: config.expireIn})
        })
    }

    async logout(req, res) {

    }
}


module.exports = new LoginController();