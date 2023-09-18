const RandomMessageService = require('../services/RandomMessageService');

class RandomMessageController {

    async create(req, res) {

        try {

            const {user_id} = req;
            const result = await RandomMessageService.create(user_id);
            return res.status(result.status).json(result);

        } catch (e) {

            console.log(e.message);
            return res.status(500).json({error: 'Internal error'})

        }
    }

    async get(req, res) {

        try {

            const {user_id} = req;
            const result = await RandomMessageService.get(user_id);
            return res.status(result.status).json(result);

        } catch (e) {

            console.log(e.message);
            return res.status(500).json({error: 'Internal error'})

        }
    }
}

module.exports = new RandomMessageController();