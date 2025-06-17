import React, { useState, useEffect } from 'react';
import FrequencyChart from '@/components/Charts/FrequencyChart';
import OvertimeChart from '@/components/Charts/OvertimeChart';
import HeatmapChart from '@/components/Charts/HeatmapChart';
import { exportToCSV, exportToExcel, exportToPDF } from '@/utils/exportUtils';
import { supabase } from '@/services/supabaseClient';

const ReportsPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserId = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error('Erro ao buscar ID do usuário:', error.message);
          setError('Erro ao buscar ID do usuário.');
        } else if (data?.user?.id) {
          setUserId(data.user.id);
        } else {
          setError('ID do usuário não encontrado.');
        }
      } catch (err) {
        console.error('Erro inesperado ao buscar ID do usuário:', err);
        setError('Erro inesperado ao buscar ID do usuário.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, []);

  const handleError = (message: string) => {
    console.error(message);
    setError(message);
  };

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    const data = [
      { name: 'Frequência', value: 'Dados de frequência' },
      { name: 'Horas Extras', value: 'Dados de horas extras' },
      { name: 'Pontualidade', value: 'Dados de pontualidade' },
    ];

    switch (format) {
      case 'csv':
        exportToCSV(data, 'relatorios.csv');
        break;
      case 'excel':
        exportToExcel(data, 'relatorios.xlsx');
        break;
      case 'pdf':
        exportToPDF(data, 'relatorios.pdf');
        break;
      default:
        console.error('Formato de exportação inválido.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <img
        src="/reports-banner.png"
        alt="Banner de Relatórios"
        className="w-full max-w-4xl mx-auto mb-6 rounded-lg shadow-md"
      />
      <h1 className="text-3xl font-bold mb-6 text-center">Relatórios</h1>
      <div className="bg-white p-4 shadow rounded">
        {loading ? (
          <div className="text-blue-500">
            <p>Carregando dados...</p>
          </div>
        ) : error ? (
          <div className="text-red-500">
            <p>Erro ao carregar os relatórios: {error}</p>
          </div>
        ) : userId ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 shadow rounded">
                <h2 className="text-xl font-semibold mb-4">Frequência</h2>
                <FrequencyChart userId={userId} onError={handleError} />
              </div>
              <div className="bg-white p-4 shadow rounded">
                <h2 className="text-xl font-semibold mb-4">Horas Extras</h2>
                <OvertimeChart userId={userId} onError={handleError} />
              </div>
              <div className="bg-white p-4 shadow rounded md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Pontualidade</h2>
                <HeatmapChart userId={userId} onError={handleError} />
              </div>
            </div>
            <div className="mt-6 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <button
                className="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleExport('csv')}
              >
                Exportar CSV
              </button>
              <button
                className="button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleExport('excel')}
              >
                Exportar Excel
              </button>
              <button
                className="button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleExport('pdf')}
              >
                Exportar PDF
              </button>
            </div>
          </div>
        ) : (
          <div className="text-yellow-500">
            <p>Carregando dados do usuário...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
