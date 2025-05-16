import React from 'react';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import Points from './components/Points';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8">Ponto-AI</h1>
        <Auth />
        <Points />
      </main>
    </div>
  );
};

export default App;
