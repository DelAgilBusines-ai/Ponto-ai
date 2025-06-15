import React, { useState } from 'react';
import FrequencyChart from '@/components/Charts/FrequencyChart';
import OvertimeChart from '@/components/Charts/OvertimeChart';
import HeatmapChart from '@/components/Charts/HeatmapChart';

const ReportsPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const handleError = (message: string) => {
    console.error(message);
    setError(message);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Relatórios</h1>
      {error ? (
        <div className="text-red-500">
          <p>Erro ao carregar os relatórios: {error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold mb-4">Frequência</h2>
            <FrequencyChart onError={handleError} />
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold mb-4">Horas Extras</h2>
            <OvertimeChart onError={handleError} />
          </div>
          <div className="bg-white p-4 shadow rounded md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Pontualidade</h2>
            <HeatmapChart onError={handleError} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
