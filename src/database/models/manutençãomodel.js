const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Manutencao = sequelize.define('manutencao', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_sala: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    resolvido: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Pode ajustar o valor padrão conforme necessário
    },
    quantidade: {
      type: DataTypes.INTEGER,
      
    },
  });
  Manutencao.associate = (models) => {

    Manutencao.belongsTo(sequelize.models.Item, {
      foreignKey: 'id_item',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  
    // Associação com Sala
    Manutencao.belongsTo(sequelize.models.Sala, {
      foreignKey: 'id_sala',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
 

  return Manutencao;
};
