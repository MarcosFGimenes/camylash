const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const agendamentoRoutes = require('./routes/agendamentos'); // Rotas de agendamentos

const app = express();

// Configurações de CORS
app.use(cors({
  origin: ['http://camylash.vercel.app', 'http://mongodb.camilygimenes.kinghost.net', 'http://camilydesigner.yex1d.mongodb.net', 'https://camilygimenes.kinghost.net', 'http://camilygimenes.kinghost.net:21095'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware para pré-verificação (OPTIONS)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Configurações de body-parser
app.use(bodyParser.json());

// Conexão com o MongoDB via Mongoose
const uri = "mongodb+srv://marcosgimenesdev:bsjr8wErzR3QPgX5@camilydesigner.yex1d.mongodb.net/camilydesigner?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado ao MongoDB com sucesso!"))
  .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));

// Rotas de agendamento
app.use('/api', agendamentoRoutes);

// Rota inicial
app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

// Iniciar o servidor
const PORT = process.env.PORT || 21095;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
