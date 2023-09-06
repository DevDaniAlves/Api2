const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Turma = sequelize.define('turma', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    professor: DataTypes.STRING,
    turno: DataTypes.INTEGER,
    nome_turma: DataTypes.STRING,
    
  });

  Turma.associate = (models) => {
    Turma.belongsTo(models.sala, {
      foreignKey: 'id_sala',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Turma;
};
