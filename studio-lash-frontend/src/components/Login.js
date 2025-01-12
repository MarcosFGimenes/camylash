import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aqui você faria a validação do login com seu servidor backend
    // Vamos supor que você tenha uma API de login no seu backend que você consulta

    // Para fins de exemplo, vamos aceitar qualquer usuário "admin"
    if (username === 'admin' && password === 'admin123') {
      login(); // login do contexto
      navigate('/adminpainel'); // Redireciona para o painel
    } else {
      alert('Usuário ou senha incorretos!');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Usuário:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
