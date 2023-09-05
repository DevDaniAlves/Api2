'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('turma', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      professor: Sequelize.STRING,
      turno: Sequelize.INTEGER,
      nome_turma: Sequelize.STRING,
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
    await queryInterface.dropTable('turma');
  },
};
