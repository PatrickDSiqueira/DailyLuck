const UserController = require('../controllers/UserController')
const AuthMiddleware = require('../middleware/AuthMiddleware');

module.exports = function (application) {

    application.get('/users', AuthMiddleware, UserController.get);
    application.put('/users', AuthMiddleware, UserController.update);
    application.post('/user-leader', AuthMiddleware, UserController.createLeader);
}