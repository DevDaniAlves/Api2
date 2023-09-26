const fs = require("fs");
const https = require ('https')
const express = require('express');
const app = express()
const cors = require('cors') 

const { routes } = require('./routes');


// Adicione suas rotas ao aplicativo
app.use(cors())

app.use(express.json());
app.use('/', routes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
https.createServer({
  cert: fs.readFileSync("src/ssl/code.crt"),
  key: fs.readFileSync("src/ssl/code.key")
}, app).listen(3001, ()=> console.log("Rodando em https"))