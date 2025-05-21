import React from 'react';
import FrequencyChart from '@/components/Charts/FrequencyChart';
import OvertimeChart from '@/components/Charts/OvertimeChart';

const ReportsPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Relatórios</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold mb-4">Frequência</h2>
          <FrequencyChart />
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold mb-4">Horas Extras</h2>
          <OvertimeChart />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
