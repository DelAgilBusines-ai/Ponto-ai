# Guia da API

## Endpoints Disponíveis

### Autenticação

- **POST /auth/login**
  - Descrição: Realiza login do usuário.
  - Parâmetros:
    - `email`: E-mail do usuário.
    - `password`: Senha do usuário.

### Registro de Ponto

- **POST /time-logs**
  - Descrição: Registra um ponto.
  - Parâmetros:
    - `user_id`: ID do usuário.
    - `timestamp`: Data e hora do registro.

### Relatórios

- **GET /reports**
  - Descrição: Retorna relatórios de jornada.
  - Parâmetros:
    - `user_id`: ID do usuário.
    - `date_range`: Intervalo de datas.
