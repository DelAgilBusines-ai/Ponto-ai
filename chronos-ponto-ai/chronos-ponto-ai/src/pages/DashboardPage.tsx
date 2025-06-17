import React from 'react';
import Dashboard from '@/components/Dashboard';
import PredictiveAnalysis from '@/components/PredictiveAnalysis';

const DashboardPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <img
        src="/dashboard-banner.png"
        alt="Banner do Dashboard"
        className="w-full max-w-4xl mx-auto mb-6 rounded-lg shadow-md"
      />
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
      <div className="bg-white p-4 shadow rounded">
        <Dashboard />
      </div>
      <div className="mt-6 bg-white p-4 shadow rounded">
        <PredictiveAnalysis />
      </div>
    </div>
  );
};

export default DashboardPage;
