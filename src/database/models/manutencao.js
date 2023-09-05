const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Manutencao = sequelize.define('manutencao', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_sala: DataTypes.INTEGER,
    id_item: DataTypes.INTEGER,
    resolvido: DataTypes.BOOLEAN,
    quantidade: DataTypes.INTEGER,
    criadoem: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    editadoem: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: false,
  });

  Manutencao.associate = (models) => {
    Manutencao.belongsTo(models.sala, {
      foreignKey: 'id_sala',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Manutencao.belongsTo(models.item, {
      foreignKey: 'id_item',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Manutencao;
};
