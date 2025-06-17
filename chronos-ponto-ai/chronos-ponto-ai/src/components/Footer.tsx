import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-4 px-6 mt-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Chronos Ponto AI. Todos os direitos reservados.
        </p>
        <p className="text-sm mt-2">
          <a
            href="/privacy-policy"
            className="hover:text-gray-400 transition-colors duration-300"
          >
            Política de Privacidade
          </a>{' '}
          |{' '}
          <a
            href="/terms-of-service"
            className="hover:text-gray-400 transition-colors duration-300"
          >
            Termos de Serviço
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
