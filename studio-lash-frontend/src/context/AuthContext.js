import React, { createContext, useState, useContext } from 'react';

// Criação do contexto
const AuthContext = createContext();

// Componente provider que envolve a aplicação
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  const login = () => setAuth(true);
  const logout = () => setAuth(false);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para consumir o contexto
export const useAuth = () => useContext(AuthContext);
