const TeamController = require('../controllers/TeamController')

module.exports = function (application) {

    application.get('/team-list', TeamController.get);
}