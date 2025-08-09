# Agenda

Aplicação de agendamento com **ASP.NET Core Web API**, **PostgreSQL** e **React**.

## Banco de Dados
Execute o PostgreSQL via Docker:
```bash
docker-compose up -d
```

## Backend
Pré-requisitos: .NET 6+

1. Abra a solution `backend/Backend.sln` ou navegue até a pasta `backend`.
2. Ajuste a string de conexão em `backend/appsettings.json` se necessário.
3. Rode as migrations:
```bash
cd backend
# dotnet tool install --global dotnet-ef (se necessário)
dotnet ef database update
```
4. Execute a API:
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
