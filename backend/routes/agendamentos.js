const express = require('express');
const router = express.Router();
const Agendamento = require('../models/Agendamento');
const HorarioPadrao = require('../models/HorariosPadrao');

// Rota para buscar horários padrão
router.get('/admin/horarios-padrao', async (req, res) => {
  try {
    const horariosPadrao = await HorarioPadrao.findOne();
    if (!horariosPadrao) {
      return res.status(404).json({ message: 'Nenhum horário padrão encontrado' });
    }
    res.json(horariosPadrao);
  } catch (error) {
    console.error('Erro ao buscar horários padrão:', error);
    res.status(500).json({ error: 'Erro ao buscar horários padrão' });
  }
});

// Rota para cadastrar ou atualizar horários padrão
router.post('/admin/horarios-padrao', async (req, res) => {
  const { horarios } = req.body;
  try {
    let horariosPadrao = await HorarioPadrao.findOne();
    if (horariosPadrao) {
      horariosPadrao.horarios = horarios;
    } else {
      horariosPadrao = new HorarioPadrao({ horarios });
    }
    await horariosPadrao.save();
    res.json({ message: 'Horários padrão salvos com sucesso!', horariosPadrao });
  } catch (error) {
    console.error('Erro ao salvar horários padrão:', error);
    res.status(500).json({ error: 'Erro ao salvar horários padrão.' });
  }
});

// Rota para buscar horários padrão
router.get('/admin/horarios-padrao', async (req, res) => {
  try {
    const horariosPadrao = await HorarioPadrao.findOne();
    if (!horariosPadrao) {
      return res.status(404).json({ message: 'Nenhum horário padrão encontrado' });
    }
    res.json(horariosPadrao);
  } catch (error) {
    console.error('Erro ao buscar horários padrão:', error);
    res.status(500).json({ error: 'Erro ao buscar horários padrão' });
  }
});

// Rota para cadastrar ou atualizar horários padrão
router.post('/admin/horarios-padrao', async (req, res) => {
  const { horarios } = req.body;
  try {
    let horariosPadrao = await HorarioPadrao.findOne();
    if (horariosPadrao) {
      horariosPadrao.horarios = horarios;
    } else {
      horariosPadrao = new HorarioPadrao({ horarios });
    }
    await horariosPadrao.save();
    res.json({ message: 'Horários padrão salvos com sucesso!', horariosPadrao });
  } catch (error) {
    console.error('Erro ao salvar horários padrão:', error);
    res.status(500).json({ error: 'Erro ao salvar horários padrão.' });
  }
});

// Rota para buscar horários disponíveis
router.get('/horarios-disponiveis', async (req, res) => {
  const { data } = req.query;
  try {
    const horariosPadrao = await HorarioPadrao.findOne();
    if (!horariosPadrao) {
      return res.status(404).json({ message: 'Nenhum horário padrão cadastrado.' });
    }

    const agendados = await Agendamento.find({ data }).select('horario');
    const horariosOcupados = agendados.map((a) => a.horario);
    const horariosDisponiveis = horariosPadrao.horarios.filter(
      (h) => !horariosOcupados.includes(h)
    );

    res.json(horariosDisponiveis);
  } catch (error) {
    console.error('Erro ao buscar horários disponíveis:', error);
    res.status(500).json({ error: 'Erro ao buscar horários disponíveis.' });
  }
});

// Rota para agendar horário
router.post('/agendar', async (req, res) => {
  const { data, horario, cliente } = req.body;

  try {
    const horarioOcupado = await Agendamento.findOne({ data, horario });
    if (horarioOcupado) {
      return res.status(400).json({ message: 'Horário já ocupado.' });
    }

    const novoAgendamento = new Agendamento({ data, horario, cliente });
    await novoAgendamento.save();
    res.status(201).json({ message: 'Agendamento realizado!' });
  } catch (error) {
    console.error('Erro ao agendar horário:', error);
    res.status(500).json({ error: 'Erro ao agendar horário.' });
  }
});

// Rota para listar todos os agendamentos
router.get('/admin/agendamentos', async (req, res) => {
  try {
    const agendamentos = await Agendamento.find({ status: 'pendente' }).sort('data horario');
    res.json(agendamentos);
  } catch (error) {
    console.error('Erro ao listar agendamentos:', error);
    res.status(500).json({ error: 'Erro ao listar agendamentos.' });
  }
});

// Rota para cancelar agendamento
router.delete('/admin/agendamento/:id', async (req, res) => {
  try {
    const agendamento = await Agendamento.findByIdAndDelete(req.params.id);
    if (!agendamento) {
      return res.status(404).json({ error: 'Agendamento não encontrado.' });
    }
    res.json({ message: 'Agendamento cancelado!' });
  } catch (error) {
    console.error('Erro ao cancelar agendamento:', error);
    res.status(500).json({ error: 'Erro ao cancelar agendamento.' });
  }
});

// Rota para marcar como concluído
router.put('/admin/agendamento/:id', async (req, res) => {
  try {
    const agendamento = await Agendamento.findByIdAndUpdate(
      req.params.id,
      { status: 'concluido' },
      { new: true }
    );
    if (!agendamento) {
      return res.status(404).json({ error: 'Agendamento não encontrado.' });
    }
    res.json({ message: 'Agendamento concluído!' });
  } catch (error) {
    console.error('Erro ao concluir agendamento:', error);
    res.status(500).json({ error: 'Erro ao concluir agendamento.' });
  }
});

// Rota para remover um horário padrão
router.delete('/admin/horarios-padrao/:horario', async (req, res) => {
  const { horario } = req.params;
  try {
    const horariosPadrao = await HorarioPadrao.findOne();
    if (!horariosPadrao) {
      return res.status(404).json({ message: 'Nenhum horário padrão encontrado.' });
    }

    // Remove o horário específico
    horariosPadrao.horarios = horariosPadrao.horarios.filter(h => h !== horario);
    await horariosPadrao.save();

    res.json({ message: 'Horário padrão removido com sucesso!', horarios: horariosPadrao.horarios });
  } catch (error) {
    console.error('Erro ao remover horário padrão:', error);
    res.status(500).json({ error: 'Erro ao remover horário padrão.' });
  }
});

module.exports = router;
