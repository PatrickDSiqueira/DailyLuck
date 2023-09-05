const {User} = require('../database/models');
const AdvicesLipService = require('../services/AdvicesLipService');

class RandomMessageController {

    async get(req, res) {

        try {
            const {user_id} = req;

            const currentUser = await User.findOne({where: {id: user_id}});

            const result = await AdvicesLipService.getRandomMessage();

            if (result.status === 200) {

                const data = result.data;
                res.status(200).json(data);

            } else {

                res.status(result.status).json({error: 'Error in request'})
            }

        } catch (error) {

            res.status(500).json({error: 'Internal error'})
        }
    }
}

module.exports = new RandomMessageController();