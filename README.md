# Agendamento App

Sistema simples de agendamento de compromissos utilizando **ASP.NET Core 6**, **React** e **PostgreSQL**.

## Tecnologias
- Backend: ASP.NET Core Web API com Entity Framework Core e JWT
- Frontend: React (Vite)
- Banco: PostgreSQL

## Como rodar o backend
```bash
cd backend
# configure a connection string válida em appsettings.json
# cria o banco e aplica migrations
# dotnet ef migrations add InitialCreate
# dotnet ef database update
# executa a API
 dotnet run
```
A API ficará disponível em `http://localhost:8080`.

### Endpoints principais
- `POST /register`
- `POST /login`
- `GET /appointments` (requer JWT)
- `POST /appointments`
- `PUT /appointments/{id}`
- `DELETE /appointments/{id}`

## Como rodar o frontend
```bash
cd frontend
npm install
npm run dev
```
O frontend ficará acessível em `http://localhost:5173` e utiliza o `localStorage` para guardar o token JWT.

## Banco de Dados
Configure a string de conexão do PostgreSQL no `appsettings.json`. Exemplo:
```
"DefaultConnection": "Host=localhost;Database=sched_db;Username=postgres;Password=postgres"
```

## Estrutura das tabelas
- **Clients**: Id, Name, Email, PasswordHash
- **Appointments**: Id, ClientId, Title, Description, DateTime

Cada agendamento pertence a um cliente e não é permitido criar dois agendamentos no mesmo horário para o mesmo usuário.
