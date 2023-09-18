const DirectMessageRepository = require("../repositories/DirectMessageRepository");
const UserRepository = require("../repositories/UserRepository");

class DirectMessageService {

    async getListDirectMessage(currentUserId) {

        const currentUser = await UserRepository.getUserById(currentUserId);
        const directMessageList = await DirectMessageRepository.getMessageByTeamId(currentUser.team_id);

        if (directMessageList.length === 0) {

            return {
                status: 200,
                messages: [{message: 'Solicite ao seu líder de equipe o cadastro de uma mensagem.'}]
            }
        }

        return {
            status: 200,
            messages: directMessageList
        }
    }

    async createDirectMessage(currentUserId, message) {

        const currentUser = await UserRepository.getUserById(currentUserId);

        if (await UserRepository.isLeader(currentUser) === false) {

            return {
                status: 403,
                error: 'you dont have access'
            }
        }

        if (!message) {

            return {
                status: 400,
                error: 'Message is required'
            }
        }

        await DirectMessageRepository.create(currentUser.team_id, message);

        return {
            status: 200,
            message: 'message created successful'
        }
    }

    async update(currentUserId, message, messageId) {

        const currentUser = await UserRepository.getUserById(currentUserId);

        if (await UserRepository.isLeader(currentUser) === false) {

            return {
                status: 403,
                error: 'you dont have access'
            }
        }

        if (!message) {

            return {
                status: 400,
                error: 'Message is required'
            }
        }

        if (!messageId) {

            return {
                status: 400,
                error: 'Identification message is required'
            }
        }

        const directMessage = await DirectMessageRepository.getById(messageId);

        if (!directMessage) {

            return {
                status: 404,
                error: 'Message no found'
            }
        }

        await DirectMessageRepository.uptadeMessage(directMessage, message)

        return {
            status: 200,
            message: 'message update successful'
        }
    }

    async delete(currentUserId, messageId) {

        const currentUser = await UserRepository.getUserById(currentUserId);

        if (await UserRepository.isLeader(currentUser) === false) {

            return {
                status: 403,
                error: 'you dont have access'
            }
        }

        if (!messageId) {

            return {
                status: 400,
                error: 'Identification message is required'
            }
        }

        const directMessage = await DirectMessageRepository.getById(messageId);

        if (!directMessage) {

            return {
                status: 404,
                error: 'Message no found'
            }
        }

        await DirectMessageRepository.deleteMessage(directMessage)

        return {
            status: 200,
            message: 'message deleted successful'
        }
    }
}

module.exports = new DirectMessageService();