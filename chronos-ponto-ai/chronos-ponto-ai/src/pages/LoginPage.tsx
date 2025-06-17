import React from 'react';
import Auth from '@/components/Auth';

const LoginPage: React.FC = () => {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-800 to-blue-600 text-center">
      <img
        src="/logo teste ponto.png"
        alt="Logo Chronos Ponto AI"
        className="w-32 h-32 mb-6 animate-fade-in"
      />
      <h1 className="text-4xl font-bold mb-6 text-white animate-fade-in">
        Login
      </h1>
      <div className="bg-white p-4 shadow rounded w-full max-w-sm">
        <Auth />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4 hover:bg-blue-600 transition-all"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
