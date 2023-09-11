'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('patrimonio_sala', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_item: {
        type: Sequelize.INTEGER,
        references: {model: "items", key:"id"},
        allowNull: false
      },
      id_sala: {
        type: Sequelize.INTEGER,
        references: {model: "salas", key: 'id'},
        allowNull: false
      },
      quantidade:  {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Patrimonio_Sala');
  },
};
