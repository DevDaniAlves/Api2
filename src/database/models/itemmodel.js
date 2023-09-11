const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Item = sequelize.define('items', {
    // Definição dos campos do modelo Item
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Outros campos do Item
    nome_item: DataTypes.STRING,
    // ...
  });

  // Associação com Patrimonio_Sala
  Item.associate = (models) => {
    console.log('Setting up association with Patrimonio_Sala');
    Item.belongsToMany(models.Sala, {
      through: "patriomonio_sala",
      foreignKey: 'id_item',
      otherKey: 'id'
    });
  };
  

  return Item;
};
