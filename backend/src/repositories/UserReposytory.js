const {User, Team, AccessType, ControlMessage} = require('../database/models')

class UserRepository {

    async checkCpf(cpf) {

        const user = await User.findOne({
            where: {cpf},
        });

        return !user;
    }

    async createUser(cpf, firstName, lastName, access_type_id, team_id) {

        try {

            return await User.create({
                cpf,
                firstName,
                lastName,
                createdAt: new Date(),
                updatedAt: new Date(),
                team_id,
                access_type_id
            });

        } catch (error) {
            console.error(error)
        }
    }

    async getUserById(id) {

        return await User.findOne({
            where: id,
            include: [
                {
                    model: Team,
                    as: 'team',
                },
                {
                    model: AccessType,
                    as: 'accessType',
                },
                {
                    model: ControlMessage,
                    as: 'controlMessage',
                },
            ]
        });
    }
}

module.exports = new UserRepository();