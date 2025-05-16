import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-xl font-bold">Ponto-AI</span>
        <ul className="flex space-x-4">
          <li><a href="#login" className="hover:underline">Login</a></li>
          <li><a href="#register" className="hover:underline">Registro</a></li>
          <li><a href="#reset-password" className="hover:underline">Redefinir Senha</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
