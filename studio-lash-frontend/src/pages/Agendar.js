import React, { useState, useEffect } from "react";
import axios from "axios";

const Agendar = () => {
  const [data, setData] = useState(""); // Data selecionada
  const [horarios, setHorarios] = useState([]); // Horários disponíveis
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    observacao: "",
    horario: "",
  }); // Dados do formulário

  // URL base da API
  const API_URL = process.env.REACT_APP_API_URL;

  // Atualiza os horários disponíveis ao selecionar uma data
  useEffect(() => {
    if (data) {
      axios
        .get(`${API_URL}/api/horarios-disponiveis?data=${data}`)
        .then((response) => setHorarios(response.data))
        .catch((error) => console.error("Erro ao buscar horários:", error));
    }
  }, [data, API_URL]);

  // Submissão do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar se os dados estão preenchidos corretamente
    if (!data || !form.horario || !form.nome || !form.telefone) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    // Criar o objeto a ser enviado
    const dados = {
      data,
      horario: form.horario,
      cliente: {
        nome: form.nome,
        telefone: form.telefone,
        observacao: form.observacao,
      },
    };

    // Enviar os dados para o backend
    console.log("Enviando dados:", dados); // Log para depuração
    axios
      .post(`${API_URL}/api/agendar`, dados)
      .then(() => {
        alert("Agendamento realizado com sucesso!");
        // Limpar o formulário após o sucesso
        setForm({
          nome: "",
          telefone: "",
          observacao: "",
          horario: "",
        });
        setData("");
      })
      .catch((error) => {
        console.error("Erro ao realizar o agendamento:", error.response || error);
        alert("Erro ao realizar o agendamento");
      });
  };

  return (
    <div className="bg-lilac-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-extrabold text-purple-700 text-center mb-6">
          Agendar Horário
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Data:</label>
            <input
              type="date"
              value={data}
              className="border border-gray-300 rounded-lg w-full p-3 text-gray-700 focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Horários Disponíveis:
            </label>
            <select
              value={form.horario}
              className="border border-gray-300 rounded-lg w-full p-3 text-gray-700 focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setForm({ ...form, horario: e.target.value })}
              required
            >
              <option value="">Selecione um horário</option>
              {horarios.map((horario) => (
                <option key={horario} value={horario}>
                  {horario}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Nome:</label>
            <input
              type="text"
              value={form.nome}
              className="border border-gray-300 rounded-lg w-full p-3 text-gray-700 focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Telefone:</label>
            <input
              type="text"
              value={form.telefone}
              className="border border-gray-300 rounded-lg w-full p-3 text-gray-700 focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setForm({ ...form, telefone: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Observação:
            </label>
            <textarea
              value={form.observacao}
              className="border border-gray-300 rounded-lg w-full p-3 text-gray-700 focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setForm({ ...form, observacao: e.target.value })}
            />
          </div>
          <button className="bg-purple-700 text-white py-3 px-6 rounded-lg w-full font-bold text-lg hover:bg-purple-800 transition duration-300">
            Agendar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Agendar;
