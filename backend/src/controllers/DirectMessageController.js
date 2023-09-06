const UserRepository = require('../repositories/UserRepository');
const DirectMessageRepository = require('../repositories/DirectMessageRepository');

class DirectMessageController {

    async get(req, res) {

        try {
            const {user_id} = req;

            const currentUser = await UserRepository.getUserById(user_id);
            const directMessageList = await DirectMessageRepository.getMessageByTeamId(currentUser.team_id);

            if (directMessageList.length === 0) {

                return res.status(404)
                    .json(['Solicitar ao líder da equipe o cadastro de uma mensagem.'])
            }

            return res.status(200).json(directMessageList);

        } catch (error) {

            console.error(error)

            return res.status(500).json({error: 'Internal error'})
        }
    }

    async create(req, res) {

        try {

            const {user_id} = req;
            const {message} = req.body;

            const currentUser = await UserRepository.getUserById(user_id);

            if (await UserRepository.isLeader(currentUser) === false) {

                return res.status(403)
                    .json({error: 'you dont have access'});
            }

            if (!message) {
                return res.status(400).json({error: 'Message is required'})
            }

            await DirectMessageRepository.create(currentUser.team_id, message);

            return res.status(200).json({message: 'message created successful'})

        } catch (error) {

            console.error(error)

            return res.status(500).json({error: 'Internal error'})
        }

    }

    async update(req, res) {

        try {

            const {user_id} = req;
            const {message, id} = req.body;

            const currentUser = await UserRepository.getUserById(user_id);

            if (await UserRepository.isLeader(currentUser) === false) {

                return res.status(403)
                    .json({error: 'you dont have access'});
            }

            if (!message) {
                return res.status(400).json({error: 'Message is required'})
            }

            if (!id) {
                return res.status(400).json({error: 'Identification message is required'})
            }

            const directMessage = await DirectMessageRepository.getById(id);

            if (!directMessage) {

                return res.status(404).json({error: 'Message no found'})
            }

            await DirectMessageRepository.uptadeMessage(directMessage, message)

            return res.status(200).json({message: 'message update successful'})

        } catch (error) {

            console.error(error)
            return res.status(500).json({error: 'Internal error'})
        }
    }

    async delete(req, res) {

        try {

            const {user_id} = req;
            const {id} = req.body;

            const currentUser = await UserRepository.getUserById(user_id);

            if (await UserRepository.isLeader(currentUser) === false) {

                return res.status(403)
                    .json({error: 'you dont have access'});
            }

            if (!id) {
                return res.status(400).json({error: 'Identification message is required'})
            }

            const directMessage = await DirectMessageRepository.getById(id);

            if (!directMessage) {

                return res.status(404).json({error: 'Message no found'})
            }

            await DirectMessageRepository.deleteMessage(directMessage)

            return res.status(200).json({message: 'message deleted successful'})

        } catch (error) {

            console.error(error)

            return res.status(500).json({error: 'Internal error'})
        }

    }
}

module.exports = new DirectMessageController();