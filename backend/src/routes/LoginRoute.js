const LoginController = require('../controllers/LoginController')

module.exports = function (application) {
    application.get('/login', LoginController.index);

    }
