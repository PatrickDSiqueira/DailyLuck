const User = require('../database/models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/Auth');
class LoginController {
    async index (req, res) {

        const {email, password} = req.body;

        // const userExist = User.findOne({ email });
        const userExist = {
            id:1,
                email: "psique.siqueira@gmaeweil.com",
                password: "123456"
            }
        ;

        if(!userExist){

            return res.status(400).json({
                error : true,
                message : "User dont exist"
            });
            //
            // if(!( await bcrypt.compare(password, userExist.password))){
            //
            //     return res.status(400).json({
            //         error: true,
            //         message: "Invalid password"
            //     })
            // }

        }

        console.log(config);


            return res.status(200).json({
                user : {
                    name : userExist.name,
                    email : userExist.email
                },
                token: jwt.sign(
                    {id: userExist.id},
                    config.secret,
                    {expiresIn: config.expireIn})
            })
    }
}


module.exports = new LoginController();