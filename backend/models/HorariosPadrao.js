const mongoose = require('mongoose');

const HorarioPadraoSchema = new mongoose.Schema({
  horarios: {
    type: [String], // Array de horários, ex.: ['09:00', '10:00']
    required: true,
  },
});

module.exports = mongoose.model('HorarioPadrao', HorarioPadraoSchema);
