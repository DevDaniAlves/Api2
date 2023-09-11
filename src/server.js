const express = require('express');
const app = express();

const { routes } = require('./routes');
const {SECRET_KEY} = require('./enviroments')
// Adicione suas rotas ao aplicativo
app.use(express.json());
app.use('/', routes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
