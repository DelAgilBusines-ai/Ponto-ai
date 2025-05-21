import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/supabaseClient';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Erro ao obter sessão:', error.message);
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(!!data.session); // Verifica se há uma sessão ativa
      }
    };

    checkSession();
  }, []);

  if (isAuthenticated === null) {
    // Exibe um estado de carregamento enquanto verifica a autenticação
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
