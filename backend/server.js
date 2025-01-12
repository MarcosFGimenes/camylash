const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importe o pacote CORS
const bodyParser = require('body-parser');
const agendamentoRoutes = require('./routes/agendamentos');

const app = express();

// Configurações de CORS
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://camylash.vercel.app'], // Substitua com a URL do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  })
);

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
