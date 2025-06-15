import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, Title, BarElement } from 'chart.js';

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, Title, BarElement);

const HeatmapChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Destroi o gráfico existente antes de criar um novo
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const data = {
      labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
      datasets: [
        {
          label: 'Pontualidade',
          data: [1, 0.8, 0.6, 0.9, 0.7], // Valores de pontualidade
          backgroundColor: (context: any) => {
            const value = context.raw;
            return value > 0.8 ? 'rgba(34, 197, 94, 0.8)' : 'rgba(239, 68, 68, 0.8)';
          },
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context: any) => `Pontualidade: ${(context.raw * 100).toFixed(0)}%`,
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Dias da Semana',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Pontualidade (%)',
          },
          ticks: {
            callback: (value: number) => `${value * 100}%`,
          },
        },
      },
    };

    // Cria uma nova instância do gráfico
    chartInstanceRef.current = new ChartJS(ctx, {
      type: 'bar',
      data,
      options,
    });

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

export default HeatmapChart;
