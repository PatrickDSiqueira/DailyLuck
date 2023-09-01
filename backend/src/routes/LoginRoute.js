const LoginController = require('../controllers/LoginController')

module.exports = function (application) {
    application.post('/login', LoginController.index);
}
