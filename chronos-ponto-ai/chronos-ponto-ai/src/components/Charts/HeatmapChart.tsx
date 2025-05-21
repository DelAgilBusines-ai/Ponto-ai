import React from 'react';
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, Title } from 'chart.js';
import { Heatmap } from 'chartjs-chart-heatmap';

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, Title);

const HeatmapChart: React.FC = () => {
  const data = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
    datasets: [
      {
        label: 'Pontualidade',
        data: [
          { x: 'Seg', y: 8, v: 1 },
          { x: 'Ter', y: 9, v: 0.8 },
          { x: 'Qua', y: 10, v: 0.6 },
          { x: 'Qui', y: 11, v: 0.9 },
          { x: 'Sex', y: 12, v: 0.7 },
        ],
        backgroundColor: (ctx: any) => {
          const value = ctx.raw.v;
          return value > 0.8 ? 'rgba(34, 197, 94, 0.8)' : 'rgba(239, 68, 68, 0.8)';
        },
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
          label: (context: any) => `Pontualidade: ${context.raw.v * 100}%`,
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Dias da Semana',
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Horário de Entrada',
        },
      },
    },
  };

  return <Heatmap data={data} options={options} />;
};

export default HeatmapChart;
