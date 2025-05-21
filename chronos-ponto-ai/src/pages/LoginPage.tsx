import React from 'react';
import Auth from '@/components/Auth';

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Bem-vindo ao Chronos Ponto AI</h1>
      <Auth />
    </div>
  );
};

export default LoginPage;
