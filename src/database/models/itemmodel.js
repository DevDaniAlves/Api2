const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Item = sequelize.define('Item', {
    // Definição dos campos do modelo Item
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Outros campos do Item
    nome_item: DataTypes.STRING,
    // ...
  }, {
    tableName: 'items', // Especifique o nome da tabela como 'items'
  });

  // Associação com Patrimonio_Sala
  Item.associate = (models) => {
    Item.belongsToMany(models.Sala, {
      through: "patrimonio_salas",
      foreignKey: 'id_item',
      otherKey: 'id_sala'
    });
  };

  return Item;
};
