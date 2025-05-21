/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  // Adicione aqui outras variáveis de ambiente que você queira tipar no futuro
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}