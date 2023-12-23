const express = require('express');
const bodyParser = require('body-parser');
const models = require('./app/models');
const routes = require('./app/routes');

const app = express();
const port = 3000;

// Configurar o EJS como view engine
app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(express.static("public"));

// Middleware para analisar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Inicializar o banco de dados
models.initDatabase();

// Configurar rotas
app.use('/', routes);

// Lidar com rotas não encontradas (404)
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// Lidar com erros internos do servidor (500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
