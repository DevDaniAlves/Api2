const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    // Adicione esta configuração para habilitar createdAt e updatedAt automáticos
    timestamps: true,
  });

  // Adicione associações aqui se necessário

  return User;
};
