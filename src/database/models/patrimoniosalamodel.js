const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Patrimonio_Sala = sequelize.define('patrimonio_sala', {
    id_item: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_sala: DataTypes.INTEGER,
    quantidade: DataTypes.INTEGER,
  }, {
    timestamps: false,
  });

  Patrimonio_Sala.associate = (models) => {
    Patrimonio_Sala.belongsTo(models.sala, {
      foreignKey: 'id_sala',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Patrimonio_Sala.belongsTo(models.item, {
      foreignKey: 'id_item',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Patrimonio_Sala;
};
