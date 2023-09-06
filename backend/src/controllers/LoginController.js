const {User, Team, AccessType} = require('../database/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/Auth');

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
                error: true,
                message: "User dont exist"
            });
        }

        // if (!(await bcrypt.compare(cpf, userExist.cpf))) {
        //
        //     return res.status(400).json({
        //         error: true,
        //         message: "Invalid password"
        //     })
        // }

        return res.status(200).json({
            user: {
                name: userExist.name,
                email: userExist.team
            },
            token: jwt.sign(
                {id: userExist.id},
                config.secret,
                {expiresIn: config.expireIn})
        })
    }

    async logout(req, res) {

    }
}


module.exports = new LoginController();