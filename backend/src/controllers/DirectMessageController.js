const DirectMessageService = require("../services/DirectMessageService");

class DirectMessageController {

    async get(req, res) {

        try {

            const {user_id} = req;
            const result = await DirectMessageService.getListDirectMessage(user_id);
            return res.status(result.status).json(result);

        } catch (error) {

            console.error(error.message)
            return res.status(500).json({error: 'Internal error'})
        }
    }

    async create(req, res) {

        try {

            const {user_id} = req;
            const {message} = req.body;
            const result = await DirectMessageService.createDirectMessage(user_id, message);
            return res.status(result.status).json(result);

        } catch (error) {

            console.error(error.message)
            return res.status(500).json({error: 'Internal error'})
        }
    }

    async update(req, res) {

        try {

            const {user_id} = req;
            const {message, id} = req.body;
            const result = await DirectMessageService.update(user_id, message, id);
            return res.status(result.status).json(result);

        } catch (error) {

            console.error(error.message)
            return res.status(500).json({error: 'Internal error'})
        }
    }

    async delete(req, res) {

        try {

            const {user_id} = req;
            const {id} = req.params;
            const result = await DirectMessageService.delete(user_id, id);
            return res.status(result.status).json(result);

        } catch (error) {

            console.error(error.message)
            return res.status(500).json({error: 'Internal error'})
        }
    }
}

module.exports = new DirectMessageController();