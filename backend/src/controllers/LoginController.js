const LoginService = require("../services/LoginService");

class LoginController {

    async index(req, res) {

        try {

            const {cpf} = req.body;
            const result = await LoginService.index(cpf);
            res.status(result.status).json(result);

        } catch (e) {

            console.error(e.message)
            return res.status(500).json({error: 'Internal error'})
        }
    }
}


module.exports = new LoginController();