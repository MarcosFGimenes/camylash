import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-purple-700 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Título */}
        <h1 className="text-3xl font-extrabold text-white tracking-wider">
          Studio Lash
        </h1>
        
        {/* Links de Navegação */}
        <div className="space-x-6">
          <Link
            to="/"
            className="text-white text-lg font-medium hover:text-purple-300 transition duration-300"
          >
            Início
          </Link>
          <Link
            to="/agendar"
            className="text-white text-lg font-medium hover:text-purple-300 transition duration-300"
          >
            Agendar
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
