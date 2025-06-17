import React, { useState, useEffect } from 'react';
import { supabase } from '@/services/supabaseClient';

const PredictiveAnalysis: React.FC = () => {
  const [predictions, setPredictions] = useState<{ type: string; message: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPredictions = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('time_records')
          .select('*');

        if (error) {
          console.error('Erro ao buscar dados para análise preditiva:', error.message);
          return;
        }

        const newPredictions: { type: string; message: string }[] = [];

        data?.forEach((record) => {
          const checkInTime = new Date(record.check_in).getHours();
          const checkOutTime = record.check_out ? new Date(record.check_out).getHours() : null;

          // Previsão de horas extras
          if (checkOutTime && checkOutTime - checkInTime > 8) {
            newPredictions.push({
              type: 'warning',
              message: `Previsão de horas extras para o usuário ${record.user_id}.`,
            });
          }

          // Previsão de absenteísmo
          if (!record.check_in) {
            newPredictions.push({
              type: 'error',
              message: `Risco de absenteísmo detectado para o usuário ${record.user_id}.`,
            });
          }
        });

        setPredictions(newPredictions);
      } catch (err) {
        console.error('Erro inesperado ao buscar dados para análise preditiva:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Análise Preditiva</h2>
      {loading ? (
        <p>Carregando previsões...</p>
      ) : predictions.length > 0 ? (
        <ul className="list-disc list-inside">
          {predictions.map((prediction, index) => (
            <li key={index} className={`text-${prediction.type === 'warning' ? 'yellow' : 'red'}-500`}>
              {prediction.message}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-green-500">Nenhuma previsão de risco detectada.</p>
      )}
    </div>
  );
};

export default PredictiveAnalysis;
