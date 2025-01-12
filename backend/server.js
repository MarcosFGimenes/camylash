const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importe o pacote CORS
const bodyParser = require('body-parser');
const agendamentoRoutes = require('./routes/agendamentos');

const app = express();

// Configurações de CORS (Deve ser o primeiro middleware!)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permite todas as origens
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200); // Responde às requisições preflight
  } else {
    next();
  }
});


// Configurações
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect(
  'mongodb+srv://marcosgimenes:<sua-senha>@camylash.br4fc.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Rotas de agendamento
app.use('/api', agendamentoRoutes);

// Rota inicial
app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
