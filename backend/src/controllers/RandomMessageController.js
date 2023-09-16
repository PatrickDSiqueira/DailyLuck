const UserRepository = require('../repositories/UserRepository');
const ControlMessageRepository = require('../repositories/ControlMessageRepository');

const AdvicesLipService = require('../services/AdvicesLipService');

class RandomMessageController {

    async create(req, res) {

        try {
            const {user_id} = req;

            const currentUser = await UserRepository.getUserById(user_id);

            const controlMessage = currentUser.controlMessage ||
                (await ControlMessageRepository.createByUser({userId: currentUser.id}));

            if (controlMessage.countMessages >= 4) {

                let currentDate = new Date();

                if (JSON.parse(controlMessage.lastMessage).date === currentDate.toDateString()) {

                    const tomorrow = new Date(currentDate.setDate(currentDate.getDate() + 1));
                    return res.status(200).json({update_on: tomorrow.toDateString('pt-br', {timeZone: 'America/Sao_Paulo'})})
                }

                await ControlMessageRepository.resetControl(controlMessage);
            }


            const result = await AdvicesLipService.getRandomMessage();

            let message = {
                result,
                date: new Date().toDateString('pt-br', {timeZone: 'America/Sao_Paulo'})
            };

            let messageJson = JSON.stringify(message);

            await ControlMessageRepository.countOneMessage({controlMessage, message: messageJson})
                .then(() => {

                    return res.status(201).json({message});
                });

        } catch (error) {

            console.log(error)

            return res.status(500).json({error: 'Internal error'})
        }
    }

    async get(req, res) {
        try {

            const {user_id} = req;

            const currentUser = await UserRepository.getUserById(user_id);

            const controlMessage = currentUser.controlMessage ||
                (await ControlMessageRepository.createByUser({userId: currentUser.id}));

            let nextMessageTime = false;
            let currentDate = new Date();
            if (controlMessage.countMessages >= 4) {

                if (JSON.parse(controlMessage.lastMessage).date === currentDate.toDateString()) {

                    const tomorrow = new Date(currentDate.setDate(currentDate.getDate() + 1));
                    nextMessageTime = tomorrow.toDateString('pt-br', {timeZone: 'America/Sao_Paulo'});
                } else {

                    await ControlMessageRepository.resetControl(controlMessage);
                }
            }
            let message = controlMessage.lastMessage
                ? JSON.parse(controlMessage.lastMessage)
                : {
                    result: {
                        en: 'You haven\'t used any of your 4 available messages today.',
                        pt: 'Você ainda não usou nenhuma das suas 4 mensagens disponíveis hoje.'
                    },
                    date: currentDate.toDateString()
                }

            return res.status(200).json({
                message,
                countMessages: controlMessage.countMessages,
                update_on: nextMessageTime
            });

        } catch (error) {

            console.log(error);

            return res.status(500).json({error: 'Internal error'})
        }
    }
}

module.exports = new RandomMessageController();