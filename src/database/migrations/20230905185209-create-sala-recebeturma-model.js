'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sala_recebe_turmas', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
      id_turma: {
        type: Sequelize.INTEGER,
        references: {
          model: "turmas",
          key: 'id',
          onDelete: 'CASCADE', // Adicione esta linha para definir ON DELETE CASCADE
          onUpdate: 'CASCADE', // Adicione esta linha para definir ON UPDATE CASCADE
        },
        allowNull: false
      },
      turno: {
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
    await queryInterface.dropTable('sala_recebe_turma');
  },
};
