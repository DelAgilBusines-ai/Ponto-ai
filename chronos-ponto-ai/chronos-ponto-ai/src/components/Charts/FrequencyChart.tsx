import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { supabase } from '@/services/supabaseClient';

interface FrequencyChartProps {
  onError?: (message: string) => void;
}

const FrequencyChart: React.FC<FrequencyChartProps> = ({ onError }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: user, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          throw new Error('Erro ao obter informações do usuário.');
        }

        const { data, error } = await supabase
          .from('time_records')
          .select('check_in')
          .eq('user_id', user.id); // Filtra os registros pelo user_id do usuário logado

        if (error) {
          throw new Error(`Erro ao buscar dados de frequência: ${error.message}`);
        }

        const frequencyData = [0, 0, 0, 0, 0]; // Seg, Ter, Qua, Qui, Sex
        data?.forEach((record) => {
          const day = new Date(record.check_in).getDay();
          if (day >= 1 && day <= 5) {
            frequencyData[day - 1] += 1;
          }
        });

        setChartData({
          labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
          datasets: [
            {
              label: 'Frequência',
              data: frequencyData,
              backgroundColor: 'rgba(59, 130, 246, 0.5)',
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (err: any) {
        console.error(err.message);
        if (onError) onError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [onError]);

  if (loading) {
    return <p>Carregando dados...</p>;
  }

  if (!chartData) {
    return <p className="text-red-500">Erro ao carregar os dados do gráfico.</p>;
  }

  return <Bar data={chartData} options={{ responsive: true }} />;
};

export default FrequencyChart;
