const {ControlMessage} = require('../database/models')

class ControlMessageRepository {

    async createByUser({userId}) {

        try {

            return await ControlMessage.create({
                userId,
                countMessages : 0
            });

        } catch (error) {
            console.error(error)
        }
    }

    async resetControl(controlMessage) {

        try {

            controlMessage.countMessages = 0;
            controlMessage.lastMessage = null;
            controlMessage.save();

        } catch (error) {
            console.error(error)
        }
    }

    async countOneMessage({controlMessage, message}) {

        try {

            controlMessage.countMessages++;
            controlMessage.lastMessage = message;
            controlMessage.save();

        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = new ControlMessageRepository();