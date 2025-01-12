const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const agendamentoRoutes = require('./routes/agendamentos'); // Rotas de agendamentos

const app = express();

// Configurações de CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://camylash.vercel.app', 'https://camylash-production.up.railway.app'], // URLs permitidas
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

// Middleware para pré-verificação (OPTIONS)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Configurações de body-parser
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose
  .connect(
    'mongodb://mongo:HqOhLmRhOItvfzmuHOqhEUnqnxnsiQVR@monorail.proxy.rlwy.net:45032',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas de agendamento
app.use('/api', agendamentoRoutes);

// Rota inicial
app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
