const DirectMessageController = require('../controllers/DirectMessageController')
const AuthMiddleware = require('../middleware/AuthMiddleware');

module.exports = function (application) {

    application.get('/direct-messages', AuthMiddleware, DirectMessageController.get);
    application.post('/direct-messages', AuthMiddleware, DirectMessageController.create);
    application.patch('/direct-messages', AuthMiddleware, DirectMessageController.update);
    application.delete('/direct-messages/:id', AuthMiddleware, DirectMessageController.delete);
}