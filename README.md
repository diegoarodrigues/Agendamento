# Agendamento

## Requisitos
- Docker
- .NET 8
- Node.js 18+

## Banco de dados
```
docker compose up -d
```
PostgreSQL disponível em `localhost:5432` (usuario `ag_user`, senha `ag_pass`).

## Backend
```
cd backend
# ajustar connection string em appsettings.json se necessário
# aplicar migrations e rodar
dotnet run --project Agendamento.Api
```
Swagger em https://localhost:5001/swagger.

## Frontend
```
cd frontend
npm install
npm run dev
```
A aplicação usa `VITE_API_URL` (padrão `http://localhost:5000`).
