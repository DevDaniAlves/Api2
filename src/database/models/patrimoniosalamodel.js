const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Patrimonio_Sala = sequelize.define('patrimonio_sala', {
    // Definição dos campos do modelo Patrimonio_Sala
    id_item: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_sala: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  // In Patrimonio_Sala model
Patrimonio_Sala.associate =(models) => {
  Patrimonio_Sala.belongsTo(models.Sala, {
    foreignKey: 'id_sala',
    targertKey: 'id'
  })
  Patrimonio_Sala.belongsTo(models.Item, {
    foreignKey: 'id_item',
    targertKey: 'id'
  })
}
  
  return Patrimonio_Sala;
};
