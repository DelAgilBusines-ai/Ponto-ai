import React, { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import PredictiveAnalysis from '@/components/PredictiveAnalysis';
import Chatbot from '@/components/Chatbot';

const DashboardPage: React.FC = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen((prev) => !prev);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
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
      {/* Botão flutuante para abrir o chatbot */}
      {!isChatbotOpen && (
        <div
          className="fixed bottom-4 right-4 cursor-pointer flex flex-col items-center"
          onClick={toggleChatbot}
        >
          <img
            src="/logo teste ponto.png" /* Usando uma imagem existente em public */
            alt="Chatbot"
            className="w-16 h-16 animate-bounce"
            style={{ filter: 'drop-shadow(0 0 10px #ff5722)' }}
          />
          <span className="text-sm font-bold text-orange-500">Chatbot</span>
        </div>
      )}
      {/* Chatbot */}
      {isChatbotOpen && <Chatbot onClose={toggleChatbot} onToggle={toggleChatbot} />}
    </div>
  );
};

export default DashboardPage;
