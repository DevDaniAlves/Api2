const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PatrimonioSala = sequelize.define('PatrimonioSala', {
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
  },{tableName: 'patrimonio_salas'},);

  // In Patrimonio_Sala model
PatrimonioSala.associate =(models) => {
  PatrimonioSala.belongsTo(models.Sala, {
    foreignKey: 'id_sala',
    targertKey: 'id'
  })
  Patrimonio_Sala.belongsTo(models.Item, {
    foreignKey: 'id_item',
    targertKey: 'id'
  })
}
  
  return PatrimonioSala;
};
