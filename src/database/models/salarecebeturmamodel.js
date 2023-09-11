const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SalaRecebeTurma = sequelize.define('sala_recebe_turma', {
    id_sala: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_turma: DataTypes.INTEGER,
    turno: DataTypes.INTEGER,
  
  }, {
    timestamps: true,
  });

  SalaRecebeTurma.associate = (models) => {
    SalaRecebeTurma.belongsTo(models.sala, {
      foreignKey: 'id_sala',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    SalaRecebeTurma.belongsTo(models.turma, {
      foreignKey: 'id_turma',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return SalaRecebeTurma;
};
