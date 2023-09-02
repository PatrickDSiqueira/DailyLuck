const AuthMiddleware = require('../middleware/AuthMiddleware');

module.exports = function (aplication) {
    aplication.get('/', AuthMiddleware, function(req, res){
        res.send('aplication')
    })
}