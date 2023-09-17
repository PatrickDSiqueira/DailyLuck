const TeamRepository = require("../repositories/TeamRepository");
const {User, Team, AccessType} = require("../database/models");
const UserRepository = require("../repositories/UserRepository");
const jwt = require("jsonwebtoken");
const config = require("../config/Auth");

class LoginService {

    async index(cpf) {

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

            return {
                status: 400,
                error: "User dont exist"
            }
        }

        if (!userExist.isActive) {

            return {
                status: 400,
                error: "Access blocked. Contact your administrator"
            }
        }

        let payload = {
            id: userExist.id,
            firstName: userExist.firstName,
            lastName: userExist.lastName,
            isLeader: await UserRepository.isLeader(userExist),
            isAdmin: await UserRepository.isAdmin(userExist),
            isEmployees: await UserRepository.isEmployees(userExist),
        }

        return {
            status: 200,
            user: {
                name: userExist.name,
                email: userExist.team
            },
            token: jwt.sign(
                payload,
                config.secret,
                {expiresIn: config.expireIn})
        }
    }
}

module.exports = new LoginService();