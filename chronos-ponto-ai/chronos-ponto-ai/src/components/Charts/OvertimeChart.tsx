import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, Title, LineElement, PointElement } from 'chart.js';

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, Title, LineElement, PointElement);

const OvertimeChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!canvasRef.current) return;

      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      // Destroi o gráfico existente antes de criar um novo
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      try {
        const { data: user, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          throw new Error('Erro ao obter informações do usuário.');
        }

        const { data, error } = await supabase
          .from('time_records')
          .select('check_in, check_out')
          .eq('user_id', user.id); // Filtra os registros pelo user_id do usuário logado

        if (error) {
          throw new Error(`Erro ao buscar dados de horas extras: ${error.message}`);
        }

        const overtimeData = [0, 0, 0, 0, 0]; // Jan, Fev, Mar, Abr, Mai
        data?.forEach((record) => {
          const checkIn = new Date(record.check_in);
          const checkOut = record.check_out ? new Date(record.check_out) : null;

          if (checkOut) {
            const hoursWorked = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
            if (hoursWorked > 8) {
              const month = checkIn.getMonth();
              overtimeData[month] += hoursWorked - 8;
            }
          }
        });

        const dataConfig = {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
          datasets: [
            {
              label: 'Horas Extras',
              data: overtimeData,
              fill: false,
              backgroundColor: 'rgba(234, 179, 8, 0.5)',
              borderColor: 'rgba(234, 179, 8, 1)',
            },
          ],
        };

        const options = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top' as const,
            },
            tooltip: {
              callbacks: {
                label: (context: any) => `${context.raw} horas extras`,
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Meses',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Horas Extras',
              },
            },
          },
        };

        // Cria uma nova instância do gráfico
        chartInstanceRef.current = new ChartJS(ctx, {
          type: 'line',
          data: dataConfig,
          options,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    // Limpa o gráfico ao desmontar o componente
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default OvertimeChart;
