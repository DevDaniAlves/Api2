'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('manutencao', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_sala: Sequelize.INTEGER,
      id_item: Sequelize.INTEGER,
      resolvido: Sequelize.BOOLEAN,
      quantidade: Sequelize.INTEGER,
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
    await queryInterface.dropTable('manutencao');
  },
};
