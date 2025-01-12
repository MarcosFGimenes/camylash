import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [agendamentos, setAgendamentos] = useState([]); // Lista de agendamentos pendentes
  const [horariosPadrao, setHorariosPadrao] = useState([]); // Horários padrão
  const [novoHorario, setNovoHorario] = useState(""); // Input para novo horário padrão

  useEffect(() => {
    fetchAgendamentos();
    fetchHorariosPadrao();
  }, []);

  // Buscar agendamentos pendentes
  const fetchAgendamentos = () => {
    axios
      .get("http://localhost:3000/api/admin/agendamentos")
      .then((response) => setAgendamentos(response.data))
      .catch((error) => {
        console.error("Erro ao buscar agendamentos:", error);
      });
  };

  // Buscar horários padrão
  const fetchHorariosPadrao = () => {
    axios
      .get("http://localhost:3000/api/admin/horarios-padrao")
      .then((response) => setHorariosPadrao(response.data.horarios || []))
      .catch((error) => {
        console.error("Erro ao buscar horários padrão:", error);
      });
  };

  // Concluir agendamento
  const concluirAgendamento = (id) => {
    if (
      window.confirm("Deseja realmente marcar este agendamento como concluído?")
    ) {
      axios
        .put(`http://localhost:3000/api/admin/agendamento/${id}`)
        .then(() => {
          alert("Agendamento concluído com sucesso!");
          fetchAgendamentos(); // Atualiza a lista
        })
        .catch((error) => {
          console.error("Erro ao concluir agendamento:", error);
          alert("Erro ao concluir agendamento.");
        });
    }
  };

  // Cancelar agendamento
  const cancelarAgendamento = (id) => {
    if (window.confirm("Deseja realmente cancelar este agendamento?")) {
      axios
        .delete(`http://localhost:3000/api/admin/agendamento/${id}`)
        .then(() => {
          alert("Agendamento cancelado com sucesso!");
          fetchAgendamentos(); // Atualiza a lista
        })
        .catch((error) => {
          console.error("Erro ao cancelar agendamento:", error);
          alert("Erro ao cancelar agendamento.");
        });
    }
  };

  // Adicionar ou atualizar horários padrão
  const adicionarHorarioPadrao = () => {
    if (!novoHorario) {
      alert("Insira um horário válido!");
      return;
    }

    const horariosAtualizados = [...horariosPadrao, novoHorario];
    axios
      .post("http://localhost:3000/api/admin/horarios-padrao", {
        horarios: horariosAtualizados,
      })
      .then(() => {
        alert("Horário padrão adicionado com sucesso!");
        setNovoHorario(""); // Limpa o campo
        fetchHorariosPadrao(); // Atualiza a lista de horários padrão
      })
      .catch((error) => {
        console.error("Erro ao adicionar horário padrão:", error);
        alert("Erro ao adicionar horário padrão.");
      });
  };

  // Remover horário padrão
  const removerHorarioPadrao = (horario) => {
    if (window.confirm(`Deseja realmente remover o horário ${horario}?`)) {
      const horariosAtualizados = horariosPadrao.filter((h) => h !== horario);
      axios
        .post("http://localhost:3000/api/admin/horarios-padrao", {
          horarios: horariosAtualizados,
        })
        .then(() => {
          alert("Horário removido com sucesso!");
          fetchHorariosPadrao(); // Atualiza a lista de horários padrão
        })
        .catch((error) => {
          console.error("Erro ao remover horário padrão:", error);
          alert("Erro ao remover horário padrão.");
        });
    }
  };

  return (
    <div className="bg-lilac-100 min-h-screen flex flex-col items-center py-10">
      {/* Gerenciar Agendamentos */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full mb-8">
        <h1 className="text-3xl font-extrabold text-purple-700 text-center mb-6">
          Painel do Administrador
        </h1>
        {agendamentos.length > 0 ? (
          <table className="w-full border border-gray-200 rounded-lg shadow-md overflow-hidden mb-6">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Data</th>
                <th className="py-3 px-4 text-left">Horário</th>
                <th className="py-3 px-4 text-left">Nome</th>
                <th className="py-3 px-4 text-left">Telefone</th>
                <th className="py-3 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {agendamentos.map((agendamento) => (
                <tr
                  key={agendamento._id}
                  className="hover:bg-purple-50 transition"
                >
                  <td className="py-3 px-4">{agendamento.data}</td>
                  <td className="py-3 px-4">{agendamento.horario}</td>
                  <td className="py-3 px-4">{agendamento.cliente.nome}</td>
                  <td className="py-3 px-4">{agendamento.cliente.telefone}</td>
                  <td className="py-3 px-4 flex justify-center space-x-2">
                    <button
                      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                      onClick={() => concluirAgendamento(agendamento._id)}
                    >
                      Concluir
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                      onClick={() => cancelarAgendamento(agendamento._id)}
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-700">
            Não há agendamentos pendentes.
          </p>
        )}
      </div>

      {/* Gerenciar Horários Padrão */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full mb-8">
        <h2 className="text-2xl font-extrabold text-purple-700 text-center mb-4">
          Gerenciar Horários Padrão
        </h2>
        <ul className="mb-4">
          {horariosPadrao.map((horario, index) => (
            <li
              key={index}
              className="text-gray-700 flex justify-between items-center mb-2"
            >
              <span>{horario}</span>
              <button
                className="text-red-500 hover:underline"
                onClick={() => removerHorarioPadrao(horario)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="time"
            value={novoHorario}
            onChange={(e) => setNovoHorario(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={adicionarHorarioPadrao}
            className="bg-purple-700 text-white py-3 px-6 rounded-lg hover:bg-purple-800 transition"
          >
            Adicionar Horário
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
