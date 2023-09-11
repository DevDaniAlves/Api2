const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

module.exports = (sequelize) => {
  const Sala = sequelize.define('salas', {
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
  });

  // Associação com Patrimonio_Sala
  Sala.associate = (models) => {
    // Associação com Patrimonio_Sala
    Sala.belongsToMany(models.Item, {
      through: "patrimonio_sala", // Use the PatrimonioSala model directly // Renamed to 'Itens' to avoid naming conflict
      foreignKey: 'id_sala',
      otherKey: 'id'
    });
  };

  return Sala;
};
