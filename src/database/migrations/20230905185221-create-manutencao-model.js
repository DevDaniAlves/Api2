'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('manutencaos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_item: {
        type: Sequelize.INTEGER,
        references: {
          model: "items",
          key: "id",
          onDelete: 'CASCADE', // Adicione esta linha para definir ON DELETE CASCADE
          onUpdate: 'CASCADE', // Adicione esta linha para definir ON UPDATE CASCADE
        },
        allowNull: false
      },
      id_sala: {
        type: Sequelize.INTEGER,
        references: {
          model: "salas",
          key: 'id',
          onDelete: 'CASCADE', // Adicione esta linha para definir ON DELETE CASCADE
          onUpdate: 'CASCADE', // Adicione esta linha para definir ON UPDATE CASCADE
        },
        allowNull: false
      },
      resolvido: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      quantidade: {
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
    await queryInterface.dropTable('manutencaos');
  },
};
