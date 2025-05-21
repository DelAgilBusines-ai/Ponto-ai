import React from 'react';
import { Line } from 'react-chartjs-2';

const OvertimeChart: React.FC = () => {
  const data = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
    datasets: [
      {
        label: 'Horas Extras',
        data: [10, 15, 8, 12, 20],
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
    },
  };

  return <Line data={data} options={options} />;
};

export default OvertimeChart;
