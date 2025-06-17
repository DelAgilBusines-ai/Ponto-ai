import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-700 text-white py-4 px-6 shadow-md fixed top-0 left-0 w-full z-50 transition-all duration-300 hover:shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-2xl font-bold hover:text-orange-500 transition-colors duration-300">
          Chronos Ponto AI
        </span>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="hover:text-orange-400 transition-colors duration-300"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="hover:text-orange-400 transition-colors duration-300"
            >
              Registro
            </Link>
          </li>
          <li>
            <Link
              to="/reset-password"
              className="hover:text-orange-400 transition-colors duration-300"
            >
              Redefinir Senha
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="hover:text-orange-400 transition-colors duration-300"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/reports"
              className="hover:text-orange-400 transition-colors duration-300"
            >
              Relatórios
            </Link>
          </li>
          <li>
            <Link
              to="/compliance"
              className="hover:text-orange-400 transition-colors duration-300"
            >
              Conformidade
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
