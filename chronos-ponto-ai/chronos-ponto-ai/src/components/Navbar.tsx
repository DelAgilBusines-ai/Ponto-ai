import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '@/services/supabaseClient';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = '/'; // Redireciona para a página inicial após logout
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
    }
  };

  return (
    <nav className="bg-blue-700 text-white py-4 px-6 shadow-md fixed top-0 left-0 w-full z-50 transition-all duration-300 hover:shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-orange-500 transition-colors duration-300">
          Chronos Ponto AI
        </Link>
        <ul className="flex space-x-6">
          {isHomePage ? (
            <>
              <li>
                <Link
                  to="/login"
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
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-400 transition-colors duration-300"
                >
                  <span role="img" aria-label="Home">🏠</span> Home
                </Link>
              </li>
              {!isLoginPage && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all"
                  >
                    Logout
                  </button>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
