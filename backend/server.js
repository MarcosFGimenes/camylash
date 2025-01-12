const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importe o pacote CORS
const bodyParser = require('body-parser');
const agendamentoRoutes = require('./routes/agendamentos');

const app = express();

// Configurações de CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://camylash.vercel.app'], // Frontend permitido
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

// Middleware para tratar pré-verificações (OPTIONS)
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    return res.status(200).json({});
  }
  next();
});

// Configurações
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect(
  'mongodb+srv://marcosgimenes:xUC6n9jPOXUXaSh5@camylash.br4fc.mongodb.net/?retryWrites=true&w=majority',
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
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
