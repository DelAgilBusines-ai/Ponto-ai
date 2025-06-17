import React, { useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';

const OvertimeChart: React.FC<{ userId: string; onError: (message: string) => void }> = ({ userId, onError }) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('time_records')
          .select('*')
          .eq('user_id', userId);

        if (error) {
          console.error('Erro ao buscar dados de horas extras:', error.message);
          onError('Erro ao buscar dados de horas extras.');
        } else {
          setData(data || []);
        }
      } catch (err) {
        console.error('Erro inesperado ao buscar dados de horas extras:', err);
        onError('Erro inesperado ao buscar dados de horas extras.');
      }
    };

    fetchData();
  }, [userId, onError]);

  return (
    <div className="chart-container" style={{ maxWidth: '400px', height: '300px' }}> {/* Reduzido o tamanho */}
      <p>Dados de horas extras: {JSON.stringify(data)}</p>
    </div>
  );
};

export default OvertimeChart;
