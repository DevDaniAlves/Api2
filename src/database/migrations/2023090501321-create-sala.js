'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sala', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      capacidade: Sequelize.INTEGER,
      localizacao: Sequelize.STRING,
      responsavel: Sequelize.STRING,
      vesp_disp: Sequelize.BOOLEAN,
      mat_disp: Sequelize.BOOLEAN,
      not_disp: Sequelize.BOOLEAN,
      tamanho: Sequelize.FLOAT,
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
    await queryInterface.dropTable('sala');
  },
};
