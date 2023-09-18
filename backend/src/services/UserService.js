const Helper = require("../Helpers/Helper");
const UserRepository = require("../repositories/UserRepository");

class UserService {

    async createUserEmployees({cpf, firstName, lastName, teamId}) {

        if (!cpf) {

            return {
                status: 400,
                error: 'The cpf is missing from the request.'
            }
        }

        const cpfValidate = Helper.validateCPF(cpf);

        if (!cpfValidate) {

            return {
                status: 400,
                error: 'The cpf is not right.'
            }
        }

        if (!await UserRepository.checkCpf(cpfValidate)) {

            return {
                status: 400,
                error: 'The cpf is used.'
            }
        }

        if (!firstName || !lastName || !teamId) {

            return {
                status: 400,
                error: 'Without Parameters required.'
            }
        }

        const user = await UserRepository.createUser(cpf, firstName, lastName, 1, teamId);

        if (user) {

            return {
                status: 201,
                firstName: user.firstName,
                lastName: user.lastName
            }

        }

        return {
            status: 400,
            error: 'Error in create User.'
        }
    }

    async getUserList(currentUserId) {

        const currentUser = await UserRepository.getUserById(currentUserId);

        if (await UserRepository.isAdmin(currentUser) === false) {

            return {
                status: 403,
                error: 'you dont have access'
            }
        }

        const userList = await UserRepository.getAllUsers();

        return {
            status: 200,
            userList
        }
    }

    async changeActive(currentUserId, idUser) {

        const currentUser = await UserRepository.getUserById(currentUserId);

        if (await UserRepository.isAdmin(currentUser) === false) {

            return {
                status: 403,
                error: 'you dont have access'
            }
        }

        if (!idUser) {

            return {
                status: 400,
                error: 'Identification user is required'
            }
        }

        const user = await UserRepository.getUserById(idUser);

        if (!user) {

            return {
                status: 404,
                error: 'User no found'
            }
        }

        if (user.isActive) {

            await UserRepository.inactiveUser(user);

        } else {

            await UserRepository.activeUser(user);
        }

        return {
            status: 200,
            message: 'user update successful'
        }
    }

    async createUserLeader(currentUserId, cpf, firstName, lastName, teamId) {

        const currentUser = await UserRepository.getUserById(currentUserId);

        if (await UserRepository.isAdmin(currentUser) === false) {

            return {
                status: 403,
                error: 'you dont have access'
            }
        }

        if (!cpf) {

            return {
                status: 400,
                error: 'The cpf is missing from the request.'
            }
        }

        const cpfValidate = Helper.validateCPF(cpf);

        if (!cpfValidate) {

            return {
                status: 400,
                error: 'The cpf is not right.'
            }
        }

        if (!await UserRepository.checkCpf(cpfValidate)) {

            return {
                status: 400,
                error: 'The cpf is used.'
            }
        }

        if (!await UserRepository.thereIsTeam(teamId)) {

            return {
                status: 400,
                error: 'Team not found.'
            }
        }

        if (!firstName || !lastName) {

            return {
                status: 400,
                error: 'Without first or last name.'
            }
        }

        const user = await UserRepository.createLeader(cpf, firstName, lastName, teamId);

        if (user) {

            return {
                status: 200,
                firstName: user.firstName,
                lastName: user.lastName
            }
        }

        return {
            status: 400,
            error: 'Error in create User.'
        }
    }
}

module.exports = new UserService();