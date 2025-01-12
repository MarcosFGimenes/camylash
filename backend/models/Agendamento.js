const mongoose = require('mongoose');

const AgendamentoSchema = new mongoose.Schema({
  data: { type: String, required: true },
  horario: { type: String, required: true },
  cliente: {
    nome: { type: String, required: true },
    telefone: { type: String, required: true },
    observacao: { type: String },
  },
  status: { type: String, default: 'pendente' }, // 'pendente' ou 'concluido'
  geradoPorHorarioPadrao: { type: Boolean, default: false }, // Indica se foi gerado automaticamente
});

module.exports = mongoose.model('Agendamento', AgendamentoSchema);
