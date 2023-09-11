const sequelize = require('../sequelize'); // Importe a instância do sequelize


(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');


        // Sincronize os modelos com o banco de dados (crie as tabelas)
        await sequelize.sync({ alter: true });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
