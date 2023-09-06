const {DirectMessage} = require('../database/models')

class DirectMessageRepository {

    async create(teamId, message) {

        try {

            return await DirectMessage.create({
                teamId, message
            });

        } catch (error) {
            console.error(error)
        }
    }

    async getMessageByTeamId(teamId) {

        try {
            return await DirectMessage.findAll({
                where: {teamId, deleted: false},
                attributes: ['id', 'message']
            });

        } catch (error) {
            console.error(error)
        }
    }

    async getById(id) {

        try {
            return await DirectMessage.findOne({
                where: {id, deleted: false},
            });
        } catch (error) {
            console.error(error)
        }
    }

    async uptadeMessage(directMessage, message) {

        try {
            directMessage.message = message;
            await directMessage.save();
        } catch (error) {
            console.error(error)
        }
    }
    async deleteMessage(directMessage) {

        try {
            directMessage.deleted = true;
            await directMessage.save();
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = new DirectMessageRepository();