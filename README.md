# Agenda

Aplicação de agenda/calendário em React (Vite) com Tailwind e date-fns.

## Backend (.NET)

A API em ASP.NET Core com persistência em PostgreSQL está localizada em `backend/Agendamento.Api`. Ela expõe endpoints REST para eventos e oferece documentação via Swagger.

### Executar o backend

```bash
cd backend/Agendamento.Api
# ajustar a string de conexão em appsettings.json se necessário
(dotnet restore && dotnet run) # requer .NET 8
```

A API estará disponível em `http://localhost:5000` e o Swagger em `http://localhost:5000/swagger`.

## Frontend

```bash
cd frontend
npm install
npm run dev
```
