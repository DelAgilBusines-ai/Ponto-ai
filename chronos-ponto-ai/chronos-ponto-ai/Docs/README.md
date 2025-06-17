# Chronos Ponto AI

Chronos Ponto AI é uma plataforma de gestão de ponto digital com análise de dados, conformidade legal e recursos inteligentes.

## Progresso Atual

### Funcionalidades Implementadas
- **Registro de Ponto Inteligente**:
  - Check-in e check-out funcionando com integração ao banco de dados.
  - Validação de usuário autenticado.
- **Análise de Dados (Descritiva e Preditiva)**:
  - Gráficos de frequência e horas extras implementados.
  - Relatórios disponíveis na página de relatórios.
- **Análise Preditiva**:
  - Previsão de horas extras com base nos registros de ponto.
  - Identificação de risco de absenteísmo.
  - Exibição de alertas no dashboard.
- **Conformidade com Normas Trabalhistas**:
  - Verificação de atrasos e alertas de conformidade.
- **Autenticação**:
  - Registro, login, redefinição de senha e logout.
- **Interface Responsiva**:
  - Layout responsivo com Tailwind CSS.

### Próximos Passos
- **Chatbot Inteligente**:
  - Implementar um chatbot para responder perguntas frequentes e auxiliar na navegação.
- **Melhorias na Interface**:
  - Refinar o design das páginas e adicionar animações.
- **Testes e Validação**:
  - Garantir a qualidade do código com testes unitários e de integração.

## Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/chronos-ponto-ai.git
   cd chronos-ponto-ai
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:
     ```
     VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

4. Execute o projeto:
   ```bash
   npm run dev
   ```

5. Acesse o projeto no navegador:
   ```
   http://localhost:5173
   ```

## Estrutura do Projeto

```
chronos-ponto-ai/
├── src/
│   ├── components/       # Componentes reutilizáveis
│   ├── contexts/         # Contextos globais
│   ├── hooks/            # Hooks personalizados
│   ├── pages/            # Páginas do sistema
│   ├── services/         # Serviços (ex.: integração com IA)
│   ├── styles/           # Estilos globais
│   ├── utils/            # Utilitários
│   └── main.tsx          # Ponto de entrada do React
├── public/               # Arquivos estáticos
├── .env.local            # Variáveis de ambiente
├── README.md             # Documentação do projeto
└── package.json          # Dependências e scripts
```

## Contribuição

1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commit das suas alterações:
   ```bash
   git commit -m "Minha nova feature"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

---
