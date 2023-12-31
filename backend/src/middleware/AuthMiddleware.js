const jwt = require("jsonwebtoken");
const config = require("../config/Auth");

const {promisify} = require('util');

module.exports = async (req, res, next) => {

    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(401).json({
            code: 130,
            error: "You're not logged"
        });
    }

    const [, token] = auth.split(" ");

    try {

        const decode = await promisify(jwt.verify)(token, config.secret);

        if (!decode) {
            return res.status(401).json({
                error: true,
                code: 130,
                message: "Your token is expire"
            });

        } else {

            req.user_id = decode.id;
            next();
        }

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: true,
                code: 130,
                message: "Your token has expired"
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                error: true,
                code: 130,
                message: "Your token is invalid"
            });
        } else {
            console.error(error.message);
            return res.status(500).json({
                error: true,
                code: 500,
                message: "Internal server error"
            });
        }
    }
}