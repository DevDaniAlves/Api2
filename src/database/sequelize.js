const { Sequelize } = require('sequelize');



const sequelize = new Sequelize('projeto', 'postgres', 'gWKbaPzMMalfTpvg7KxG', {
  host: 'containers-us-west-66.railway.app',
  port: 6970,
  dialect: 'postgres', // Use 'postgres' como o dialeto para PostgreSQL
});

// Teste a conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados PostgreSQL estabelecida com sucesso.');
  })
  .catch((err) => {
    console.error('Erro ao conectar com o banco de dados PostgreSQL:', err);
  });
  
module.exports = sequelize;
