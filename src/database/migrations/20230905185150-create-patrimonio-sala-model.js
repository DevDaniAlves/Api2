'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('patrimonio_salas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_item: {
        type: Sequelize.INTEGER,
        references: { model: "items", key: "id" },
        allowNull: false,
        onDelete: 'CASCADE', // Adicione esta linha para definir ON DELETE CASCADE
        onUpdate: 'CASCADE', // Adicione esta linha para definir ON UPDATE CASCADE
      },
      id_sala: {
        type: Sequelize.INTEGER,
        references: { model: "salas", key: 'id' },
        allowNull: false,
        onDelete: 'CASCADE', // Adicione esta linha para definir ON DELETE CASCADE
        onUpdate: 'CASCADE', // Adicione esta linha para definir ON UPDATE CASCADE
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
    await queryInterface.dropTable('Patrimonio_Sala');
  },
};
