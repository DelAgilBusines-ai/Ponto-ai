import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/services/supabaseClient';
import TimeRecord from '@/components/TimeRecord';
import Chatbot from '@/components/Chatbot';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Erro ao obter informações do usuário:', error.message);
      } else {
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('Erro ao fazer logout: ' + error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Chronos Ponto AI</h1>
      {user ? <p>Usuário: {user.email}</p> : <p>Carregando informações do usuário...</p>}
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>

      <div className="mt-6">
        <TimeRecord />
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Recursos Disponíveis</h2>
        <ul className="list-disc list-inside mt-4">
          <li>Registro de Ponto Inteligente</li>
          <li>Análise de Dados (Descritiva e Preditiva)</li>
          <li>Conformidade com Normas Trabalhistas</li>
          <li>Chatbot Inteligente</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Próximos Passos</h2>
        <p className="mt-2">Explore os recursos no menu acima para começar.</p>
      </div>

      <Chatbot />
    </div>
  );
};

export default Dashboard;