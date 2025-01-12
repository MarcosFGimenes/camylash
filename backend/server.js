const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const agendamentoRoutes = require('./routes/agendamentos');

const app = express();

// Configurações
app.use(cors());
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect(
  'mongodb+srv://marcosgimenes:xUC6n9jPOXUXaSh5@camylash.br4fc.mongodb.net/?retryWrites=true&w=majority&appName=camylash',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Rota inicial
app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

// Rotas de agendamento
app.use('/api', agendamentoRoutes);

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando em https://camylash-production.up.railway.app');
});
