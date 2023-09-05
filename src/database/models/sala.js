const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Sala = sequelize.define('sala', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    capacidade: DataTypes.INTEGER,
    localizacao: DataTypes.STRING,
    responsavel: DataTypes.STRING,
    vesp_disp: DataTypes.BOOLEAN,
    mat_disp: DataTypes.BOOLEAN,
    not_disp: DataTypes.BOOLEAN,
    tamanho: DataTypes.FLOAT,
    criadoem: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    editadoem: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Sala;
};
