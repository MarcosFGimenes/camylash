import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Agendar from "./pages/Agendar";
import Admin from "./pages/Admin";
import Login from "./pages/Login"; // Importação da página de Login
import { AuthProvider, useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { auth } = useAuth();

  if (!auth) {
    // Redireciona para login caso o usuário não esteja autenticado
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agendar" element={<Agendar />} />
          <Route path="/login" element={<Login />} /> {/* Adicionada a rota de login */}
          {/* Rota protegida de admin */}
          <Route
            path="/adminpainel"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
