import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/supabaseClient';

interface TimeRecord {
  id: string;
  check_in: string;
  check_out: string | null;
  location: string | null;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [timeRecords, setTimeRecords] = useState<TimeRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Erro ao obter informações do usuário:', error.message);
      } else {
        setUser(data.user);
      }
    };

    const fetchTimeRecords = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('time_records')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Erro ao buscar registros de ponto:', error.message);
      } else {
        setTimeRecords(data || []); // Garante que `timeRecords` seja sempre um array
      }
    };

    fetchUser();
    if (user) fetchTimeRecords();
  }, [user]);

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      const { data: activeRecords, error: activeError } = await supabase
        .from('time_records')
        .select('*')
        .eq('user_id', user.id)
        .is('check_out', null);

      if (activeError) {
        console.error('Erro ao verificar registros ativos:', activeError.message);
        return;
      }

      if (activeRecords && activeRecords.length > 0) {
        alert('Já existe um registro de entrada ativo. Registre a saída antes de criar um novo registro.');
        return;
      }

      const { data, error } = await supabase
        .from('time_records')
        .insert([{ user_id: user.id, check_in: new Date().toISOString() }])
        .select();
      if (error) {
        console.error('Erro ao registrar entrada:', error.message);
      } else if (data && data.length > 0) {
        setTimeRecords((prev) => [data[0], ...prev]);
      }
    } catch (err) {
      console.error('Erro inesperado ao registrar entrada:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async (recordId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('time_records')
        .update({ check_out: new Date().toISOString() })
        .eq('id', recordId)
        .select();
      if (error) {
        console.error('Erro ao registrar saída:', error.message);
      } else if (data && data.length > 0) {
        setTimeRecords((prev) =>
          prev.map((record) =>
            record.id === recordId ? { ...record, check_out: data[0].check_out } : record
          )
        );
      }
    } catch (err) {
      console.error('Erro inesperado ao registrar saída:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('Erro ao fazer logout: ' + error.message);
    } else {
      navigate('/'); // Redireciona para a página de login
    }
  };

  const groupRecordsByDate = (records: TimeRecord[]) => {
    return records.reduce((acc: Record<string, TimeRecord[]>, record) => {
      const date = new Date(record.check_in).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(record);
      return acc;
    }, {});
  };

  const calculateDuration = (checkIn: string, checkOut: string | null) => {
    if (!checkOut) return null;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHours}h ${diffMinutes}m`;
  };

  const groupedRecords = groupRecordsByDate(timeRecords);

  return (
    <div>
      <h1>Bem-vindo ao Dashboard</h1>
      {user ? <p>Usuário: {user.email}</p> : <p>Carregando informações do usuário...</p>}
      <button onClick={handleLogout}>Logout</button>

      <h2>Registros de Ponto</h2>
      <button onClick={handleCheckIn} disabled={loading}>
        {loading ? 'Registrando...' : 'Registrar Entrada'}
      </button>

      {Object.keys(groupedRecords).length > 0 ? (
        Object.keys(groupedRecords).map((date) => (
          <div key={date}>
            <h3>{date}</h3>
            <ul>
              {groupedRecords[date].map((record) => (
                <li key={record.id}>
                  <p>Entrada: {new Date(record.check_in).toLocaleTimeString()}</p>
                  {record.check_out ? (
                    <>
                      <p>Saída: {new Date(record.check_out).toLocaleTimeString()}</p>
                      <p>Duração: {calculateDuration(record.check_in, record.check_out)}</p>
                    </>
                  ) : (
                    <button onClick={() => handleCheckOut(record.id)} disabled={loading}>
                      {loading ? 'Registrando...' : 'Registrar Saída'}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Nenhum registro de ponto encontrado.</p>
      )}
    </div>
  );
};

export default Dashboard;
