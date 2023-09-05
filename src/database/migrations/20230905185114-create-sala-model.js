'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sala', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      capacidade: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      localizacao:  {
        type: Sequelize.STRING,
        allowNull: false
      },
      responsavel:  {
        type: Sequelize.STRING,
        allowNull: false
      },
      vesp_disp:  {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      mat_disp: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      not_disp:  {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      tamanho: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('sala');
  },
};
