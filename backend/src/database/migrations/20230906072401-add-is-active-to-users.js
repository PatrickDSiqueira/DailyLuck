'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Users', 'isActive', {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true, // Defina o valor padrão como true
        });
    },

    async down(queryInterface, Sequelize) {

        await queryInterface.removeColumn('Users', 'isActive');
    }
};