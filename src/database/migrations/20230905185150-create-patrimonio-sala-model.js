'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Patrimonio_Sala', {
      id_item: {
        type: Sequelize.INTEGER,
        references: {model: "item", key:"id"},
        allowNull: false
      },
      id_sala: {
        type: Sequelize.INTEGER,
        references: {model: "sala", key: 'id'},
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
