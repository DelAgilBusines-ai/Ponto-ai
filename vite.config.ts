import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    hmr: {
      overlay: false, // Desabilita a sobreposição de erros no navegador
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        charset: false, // Garante que o CSS seja processado corretamente
      },
    },
  },
});
