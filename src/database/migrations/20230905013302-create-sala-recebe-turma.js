'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sala_recebe_turma', {
      id_sala: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_turma: Sequelize.INTEGER,
      turno: Sequelize.INTEGER,
      criadoem: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      editadoem: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sala_recebe_turma');
  },
};
