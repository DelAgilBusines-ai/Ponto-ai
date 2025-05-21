import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/styles/index.css'; // Usando alias para importar o arquivo de estilos

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
