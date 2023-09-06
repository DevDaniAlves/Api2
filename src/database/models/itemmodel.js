const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Item = sequelize.define('item', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_item: DataTypes.STRING,
  });

  return Item;
};
