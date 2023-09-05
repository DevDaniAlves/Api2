const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Item = sequelize.define('item', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_item: DataTypes.STRING,
    criadoem: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    editadoem: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Item;
};
