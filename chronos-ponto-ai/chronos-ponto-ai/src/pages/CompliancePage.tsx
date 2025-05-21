import React, { useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';

interface ComplianceAlert {
  message: string;
  type: 'success' | 'warning' | 'error';
}

const CompliancePage: React.FC = () => {
  const [alerts, setAlerts] = useState<ComplianceAlert[]>([]);

  useEffect(() => {
    const fetchComplianceData = async () => {
      try {
        const { data, error } = await supabase
          .from('time_records')
          .select('*')
          .gte('check_in', new Date().toISOString().split('T')[0]); // Filtra registros de hoje

        if (error) {
          console.error('Erro ao buscar dados de conformidade:', error.message);
          return;
        }

        const newAlerts: ComplianceAlert[] = [];

        data?.forEach((record) => {
          const checkInTime = new Date(record.check_in).getHours();
          if (checkInTime > 9) {
            newAlerts.push({
              message: `Atraso detectado para o usuário ${record.user_id} às ${new Date(
                record.check_in
              ).toLocaleTimeString()}.`,
              type: 'warning',
            });
          }
        });

        setAlerts(newAlerts);
      } catch (err) {
        console.error('Erro inesperado ao buscar dados de conformidade:', err);
      }
    };

    fetchComplianceData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Conformidade</h1>
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Status de Conformidade</h2>
        {alerts.length > 0 ? (
          <ul className="list-disc list-inside">
            {alerts.map((alert, index) => (
              <li key={index} className={`text-${alert.type === 'warning' ? 'yellow' : 'red'}-500`}>
                {alert.message}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-500">Nenhum problema de conformidade detectado.</p>
        )}
      </div>
    </div>
  );
};

export default CompliancePage;
