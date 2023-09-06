const {User, Team, AccessType, ControlMessage} = require('../database/models')

class UserRepository {

    async checkCpf(cpf) {

        const user = await User.findOne({
            where: {cpf},
        });

        return !user;
    }
    async thereIsTeam(id) {

        const user = await Team.findOne({
            where: {id},
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

    async createLeader(cpf, firstName, lastName, team_id) {

        const access_type_id = 2;
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

    async getAllUsers() {

        return await User.findAll({
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

    async isLeader(user) {

        return user.accessType.name === 'Lider';
    }

    async inactiveUser(user) {

        user.isActive = false
        await user.save();
    }

    async activeUser(user) {

        user.isActive = true
        await user.save();
    }

    async isAdmin(user) {
        return user.accessType.name === 'Administrador';
    }

    async isEmployees(user) {
        return user.accessType.name === 'Colaborador';
    }
}

module.exports = new UserRepository();