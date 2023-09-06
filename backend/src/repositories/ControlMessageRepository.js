const {ControlMessage} = require('../database/models')

class ControlMessageRepository {

    async createByUser({userId}) {

        try {

            return await ControlMessage.create({
                userId
            });

        } catch (error) {
            console.error(error)
        }
    }

    async resetControl(controlMessage){
        try {

            controlMessage.countMessages = 0;
            controlMessage.save();

        } catch (error) {
            console.error(error)
        }
    }

    async countOneMessage(controlMessage){

        try {
            controlMessage.countMessages++;
            controlMessage.lastMessage = new Date();
            controlMessage.save();

        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = new ControlMessageRepository();