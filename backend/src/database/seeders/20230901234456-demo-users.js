'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         */

        await queryInterface.bulkInsert('AccessTypes', [
            {name: 'Colaborador', createdAt: new Date(), updatedAt: new Date()},
            {name: 'Lider', createdAt: new Date(), updatedAt: new Date()},
            {name: 'Administrador', createdAt: new Date(), updatedAt: new Date()},
        ], {});

        await queryInterface.bulkInsert('Teams', [
            {name: 'Beta', createdAt: new Date(), updatedAt: new Date()},
            {name: 'Ômega', createdAt: new Date(), updatedAt: new Date()},
            {name: 'Gama', createdAt: new Date(), updatedAt: new Date()},
            {name: 'Delta', createdAt: new Date(), updatedAt: new Date()},
        ], {});


        await queryInterface.bulkInsert('Users', [
            {
                firstName: 'Yasmin',
                lastName: 'Isabelle',
                cpf: '65506605056',
                access_type_id: 1,
                team_id: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'Diego',
                lastName: 'Kaique',
                cpf: '12920357069',
                access_type_id: 1,
                team_id: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'Sueli',
                lastName: 'Raquel',
                cpf: '09552160014',
                access_type_id: 1,
                team_id: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'César',
                lastName: 'Caio',
                cpf: '04649069033',
                access_type_id: 1,
                team_id: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'Isabelly',
                lastName: 'Marcela',
                cpf: '88510594031',
                access_type_id: 1,
                team_id: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'Ravenna',
                lastName: 'Aragão',
                cpf: '47314138001',
                access_type_id: 1,
                team_id: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'Huriel',
                lastName: 'Marcelo',
                cpf: '91774528010',
                access_type_id: 1,
                team_id: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'Avelar',
                lastName: 'João',
                cpf: '81863068031',
                access_type_id: 1,
                team_id: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});

    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         */
        await queryInterface.bulkDelete('Users', null, {});
        await queryInterface.bulkDelete('Teams', null, {});
        await queryInterface.bulkDelete('AccessTypes', null, {});
    }
};
