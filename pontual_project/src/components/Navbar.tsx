import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-2xl font-bold">Chronos Ponto AI</span>
        <ul className="flex space-x-6">
          <li><Link to="/">Login</Link></li>
          <li><Link to="/register">Registro</Link></li>
          <li><Link to="/reset-password">Redefinir Senha</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
