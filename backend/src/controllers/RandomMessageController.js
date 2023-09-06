const UserRepository = require('../repositories/UserReposytory');
const ControlMessageRepository = require('../repositories/ControlMessageRepository');

const AdvicesLipService = require('../services/AdvicesLipService');

class RandomMessageController {

    async get(req, res) {

        try {
            const {user_id} = req;

            const currentUser = await UserRepository.getUserById(user_id);

            const controlMessage = currentUser.controlMessage ||
                (await ControlMessageRepository.createByUser({userId: currentUser.id}));

            if (controlMessage.countMessages >= 4) {

                let currentDate = new Date();

                if (controlMessage.lastMessage.toDateString() === currentDate.toDateString()) {

                    const tomorrow = new Date(currentDate.setDate(currentDate.getDate() + 1))
                    return res.status(200).json({update_on: tomorrow})
                }

                await ControlMessageRepository.resetControl(controlMessage);
            }

            const result = await AdvicesLipService.getRandomMessage();

            await ControlMessageRepository.countOneMessage(controlMessage)
                .then(() => {

                    return res.status(200).json({result});
                });

        } catch (error) {

            return res.status(500).json({error: 'Internal error'})
        }
    }
}

module.exports = new RandomMessageController();