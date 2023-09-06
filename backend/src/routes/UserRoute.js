const AuthMiddleware = require('../middleware/AuthMiddleware');
const UserController = require('../controllers/UserController')

module.exports = function (application) {

    application.post('/user/create',  UserController.create)
}