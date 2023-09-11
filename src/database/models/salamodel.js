const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

module.exports = (sequelize) => {
  const Sala = sequelize.define('Sala', {
    // Definição dos campos do modelo Sala
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Outros campos da Sala
    capacidade: DataTypes.INTEGER,
    localizacao: DataTypes.STRING,
    responsavel: DataTypes.STRING,
    mat_disp: DataTypes.BOOLEAN,
    not_disp: DataTypes.BOOLEAN,
    vesp_disp: DataTypes.BOOLEAN,
    tamanho: DataTypes.FLOAT,
  },
  {tableName: "salas"});

  // Associação com Patrimonio_Sala
  Sala.associate = (models) => {
    Sala.belongsToMany(models.Item, {
      through: "patrimonio_salas",
      foreignKey: 'id_sala',
      otherKey: 'id_item'
    });
  };

  return Sala;
};
