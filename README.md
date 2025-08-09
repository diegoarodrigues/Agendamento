# Agenda

Aplicação de agendamento com **ASP.NET Core Web API**, **PostgreSQL** e **React**.

## Backend
Pré-requisitos: .NET 6+, PostgreSQL.

1. Ajuste a string de conexão em `backend/appsettings.json`.
2. Rode as migrations:
```bash
cd backend
# dotnet tool install --global dotnet-ef (se necessário)
dotnet ef migrations add InitialCreate
dotnet ef database update
```
3. Execute a API:
```bash
dotnet run
```

## Frontend
```bash
cd frontend
npm install
npm run dev
```

As rotas protegidas exigem um token JWT obtido via `POST /login` após cadastro em `POST /register`.
