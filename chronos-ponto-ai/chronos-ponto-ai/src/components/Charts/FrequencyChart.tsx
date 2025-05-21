import React from 'react';
import { Bar } from 'react-chartjs-2';

const FrequencyChart: React.FC = () => {
  const data = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
    datasets: [
      {
        label: 'Horas Trabalhadas',
        data: [8, 7.5, 8, 6, 8],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default FrequencyChart;
