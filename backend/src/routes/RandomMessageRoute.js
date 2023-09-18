const AuthMiddleware = require('../middleware/AuthMiddleware');
const RandomMessageController = require("../controllers/RandomMessageController");

module.exports = function (application) {

    application.get('/new-random-message', AuthMiddleware,  RandomMessageController.create)
    application.get('/random-message', AuthMiddleware,  RandomMessageController.get)
}