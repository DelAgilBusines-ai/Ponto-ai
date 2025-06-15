import React, { useState } from 'react';
import { supabase } from '@/services/supabaseClient';

const TimeRecord: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser(); // Obtém o usuário autenticado
      if (userError || !user) {
        alert('Usuário não autenticado.');
        return;
      }

      const { error } = await supabase.from('time_records').insert([
        { user_id: user.id, check_in: new Date().toISOString() }, // Inclui o user_id
      ]);
      if (error) {
        console.error('Erro ao registrar check-in:', error.message);
        alert('Erro ao registrar check-in.');
      } else {
        alert('Check-in registrado com sucesso!');
      }
    } catch (err) {
      console.error('Erro inesperado:', err);
      alert('Erro inesperado ao registrar check-in.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser(); // Obtém o usuário autenticado
      if (userError || !user) {
        alert('Usuário não autenticado.');
        return;
      }

      const { error } = await supabase
        .from('time_records')
        .update({ check_out: new Date().toISOString() }) // Atualiza o campo check_out
        .eq('user_id', user.id) // Garante que o update é feito apenas para o usuário autenticado
        .is('check_out', null) // Garante que o registro ainda não tenha um check_out
        .order('created_at', { ascending: false }) // Ordena pelos registros mais recentes
        .limit(1); // Atualiza apenas o registro mais recente

      if (error) {
        console.error('Erro ao registrar check-out:', error.message);
        alert('Erro ao registrar check-out.');
      } else {
        alert('Check-out registrado com sucesso!');
      }
    } catch (err) {
      console.error('Erro inesperado:', err);
      alert('Erro inesperado ao registrar check-out.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Registro de Ponto</h2>
      <button
        onClick={handleCheckIn}
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded mr-4 hover:bg-green-600"
      >
        {loading ? 'Registrando...' : 'Check-in'}
      </button>
      <button
        onClick={handleCheckOut}
        disabled={loading}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        {loading ? 'Registrando...' : 'Check-out'}
      </button>
    </div>
  );
};

export default TimeRecord;
