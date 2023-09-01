const User = require('../database/models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/Auth');
class LoginController {
    async index (req, res) {

        return res.status(400).json({
            error : true,
            message : "User dont exist"
        });


        const {email, password} = req.body;

        const userExist = User.findOne({ email });

        if(!userExist){

            return res.status(400).json({
                error : true,
                message : "User dont exist"
            });

            if(!( await bcrypt.compare(userExist.password, password))){

                return res.status(400).json({
                    error: true,
                    message: "Invalid password"
                })
            }

            return res.status(200).json({
                user : {
                    name : userExist.name,
                    email : userExist.email
                },
                token: jwt.sign(
                    {id: userExist.id},
                    config.secret,
                    {expireIn: config.expireIn})
            })
        }
    }
}


module.exports = new LoginController();