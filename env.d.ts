/// <reference types="vite/client" />

interface ImportMetaEnv {
  // URL do projeto Supabase
  readonly VITE_SUPABASE_URL: https://lwbscjhfexorzvhcjqyj.supabase.co;
  // Chave pública anônima do Supabase
  readonly VITE_SUPABASE_ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3YnNjamhmZXhvcnp2aGNqcXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MTM0ODYsImV4cCI6MjA2Mjk4OTQ4Nn0.OThUiE7cDOvayF-VG0785J9WTP4nwUTT1FbfRkIsDkE;
  // Adicione aqui outras variáveis de ambiente necessárias no futuro
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}