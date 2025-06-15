import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-700 text-white py-4 px-6 shadow-md fixed top-0 left-0 w-full z-50"> {/* Adicionado fixed, top-0, left-0, w-full e z-50 */}
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-2xl font-bold">Chronos Ponto AI</span>
        <ul className="flex space-x-6">
          <li><Link to="/">Login</Link></li>
          <li><Link to="/register">Registro</Link></li>
          <li><Link to="/reset-password">Redefinir Senha</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/reports">Relatórios</Link></li>
          <li><Link to="/compliance">Conformidade</Link></li> {/* Adicionado link para Conformidade */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
