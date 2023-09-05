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

    // Referencie o modelo 'Manutencao'
    const Manutencao = require('../models')(Sequelize).manutencao; // Certifique-se de que 'manutencao' está definido em seu arquivo 'models.js'

    // Defina a associação para o modelo 'Manutencao'
    Manutencao.associate({
      sala: require('../models')(Sequelize).sala, // Certifique-se de que 'sala' está definido em seu arquivo 'models.js'
      item: require('../models')(Sequelize).item, // Certifique-se de que 'item' está definido em seu arquivo 'models.js'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('manutencao');
  },
};
