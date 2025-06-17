import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-800 to-blue-600 text-center">
      <img
        src="/logo teste ponto.png"
        alt="Logo Chronos Ponto AI"
        className="w-32 h-32 mb-6 animate-fade-in"
      />
      <h1 className="text-4xl font-bold mb-6 text-white animate-fade-in">
        Bem-vindo ao Chronos Ponto AI
      </h1>
      <p className="text-lg text-gray-200 mb-6 animate-fade-in">
        Gerencie seus pontos de forma inteligente e eficiente. Comece sua experiência agora!
      </p>
      <div className="flex space-x-4 mb-8">
        <a
          href="/register"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
        >
          Registrar-se
        </a>
        <a
          href="/login"
          className="bg-gray-100 text-blue-500 px-4 py-2 rounded hover:bg-gray-200 transition-all"
        >
          Login
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Gestão de Ponto Inteligente</h2>
          <p className="text-gray-700">
            Registre e acompanhe os pontos dos seus funcionários com facilidade. Check-in e check-out integrados ao banco de dados.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Análise de Dados</h2>
          <p className="text-gray-700">
            Gráficos interativos e relatórios personalizados para entender a frequência, horas extras e pontualidade.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Conformidade Legal</h2>
          <p className="text-gray-700">
            Monitore normas trabalhistas com alertas automáticos sobre jornadas, intervalos e horas extras.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Chatbot Inteligente</h2>
          <p className="text-gray-700">
            Assistente virtual para responder perguntas frequentes e gerar insights proativos para sua empresa.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Segurança e Privacidade</h2>
          <p className="text-gray-700">
            Conformidade com a LGPD, autenticação multifatorial e criptografia de ponta a ponta.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Integração com Folha de Pagamento</h2>
          <p className="text-gray-700">
            API aberta para integração com sistemas de folha de pagamento e mapeamento de campos personalizável.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
