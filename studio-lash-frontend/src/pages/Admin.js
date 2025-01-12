import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [horariosPadrao, setHorariosPadrao] = useState([]);
  const [novoHorario, setNovoHorario] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchAgendamentos();
    fetchHorariosPadrao();
  }, []);

  const fetchAgendamentos = () => {
    axios
      .get(`${API_URL}/api/admin/agendamentos`)
      .then((response) => setAgendamentos(response.data))
      .catch((error) => {
        console.error("Erro ao buscar agendamentos:", error);
      });
  };

  const fetchHorariosPadrao = () => {
    axios
      .get(`${API_URL}/api/admin/horarios-padrao`)
      .then((response) => setHorariosPadrao(response.data.horarios || []))
      .catch((error) => {
        console.error("Erro ao buscar horários padrão:", error);
      });
  };

  const concluirAgendamento = (id) => {
    if (window.confirm("Deseja realmente marcar este agendamento como concluído?")) {
      axios
        .put(`${API_URL}/api/admin/agendamento/${id}`)
        .then(() => {
          alert("Agendamento concluído com sucesso!");
          fetchAgendamentos();
        })
        .catch((error) => {
          console.error("Erro ao concluir agendamento:", error);
          alert("Erro ao concluir agendamento.");
        });
    }
  };

  const cancelarAgendamento = (id) => {
    if (window.confirm("Deseja realmente cancelar este agendamento?")) {
      axios
        .delete(`${API_URL}/api/admin/agendamento/${id}`)
        .then(() => {
          alert("Agendamento cancelado com sucesso!");
          fetchAgendamentos();
        })
        .catch((error) => {
          console.error("Erro ao cancelar agendamento:", error);
          alert("Erro ao cancelar agendamento.");
        });
    }
  };

  const adicionarHorarioPadrao = () => {
    if (!novoHorario) {
      alert("Insira um horário válido!");
      return;
    }

    const horariosAtualizados = [...horariosPadrao, novoHorario];
    axios
      .post(`${API_URL}/api/admin/horarios-padrao`, {
        horarios: horariosAtualizados,
      })
      .then(() => {
        alert("Horário padrão adicionado com sucesso!");
        setNovoHorario("");
        fetchHorariosPadrao();
      })
      .catch((error) => {
        console.error("Erro ao adicionar horário padrão:", error);
        alert("Erro ao adicionar horário padrão.");
      });
  };

  const removerHorarioPadrao = (horario) => {
    if (window.confirm(`Deseja realmente remover o horário ${horario}?`)) {
      const horariosAtualizados = horariosPadrao.filter((h) => h !== horario);
      axios
        .post(`${API_URL}/api/admin/horarios-padrao`, {
          horarios: horariosAtualizados,
        })
        .then(() => {
          alert("Horário removido com sucesso!");
          fetchHorariosPadrao();
        })
        .catch((error) => {
          console.error("Erro ao remover horário padrão:", error);
          alert("Erro ao remover horário padrão.");
        });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">
          Painel do Administrador
        </h1>

        {/* Gerenciar Agendamentos */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Agendamentos Pendentes</h2>
          {agendamentos.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-purple-700 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium">Data</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Horário</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Nome</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Telefone</th>
                    <th className="px-6 py-3 text-center text-sm font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {agendamentos.map((agendamento) => (
                    <tr key={agendamento._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{agendamento.data}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{agendamento.horario}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{agendamento.cliente.nome}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{agendamento.cliente.telefone}</td>
                      <td className="px-6 py-4 whitespace-nowrap flex justify-center space-x-2">
                        <button
                          className="bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700"
                          onClick={() => concluirAgendamento(agendamento._id)}
                        >
                          Concluir
                        </button>
                        <button
                          className="bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700"
                          onClick={() => cancelarAgendamento(agendamento._id)}
                        >
                          Cancelar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">Não há agendamentos pendentes.</p>
          )}
        </div>

        {/* Gerenciar Horários Padrão */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Horários Padrão</h2>
          <ul className="mb-4">
            {horariosPadrao.map((horario, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-100 rounded px-4 py-2 mb-2"
              >
                <span>{horario}</span>
                <button
                  className="text-red-600 hover:underline text-sm"
                  onClick={() => removerHorarioPadrao(horario)}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center space-x-4">
            <input
              type="time"
              value={novoHorario}
              onChange={(e) => setNovoHorario(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={adicionarHorarioPadrao}
              className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
            >
              Adicionar Horário
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
