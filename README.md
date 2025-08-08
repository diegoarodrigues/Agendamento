# Agendamento App (React + .NET + PostgreSQL) — v2

Stack: **React (Vite + TS)** + **ASP.NET Core 8 (Web API)** + **EF Core + Npgsql** + **JWT** + **Docker** + **GitHub Actions**.

Extras incluídos:
- **Availability** (janelas de disponibilidade por usuário)
- **Conflito de agenda** aprimorado
- **Notificação por e-mail** (stub, fácil de trocar por SMTP/SendGrid)
- **Migrations EF** + `Database.Migrate()` no startup

## Rodar com Docker
```bash
docker compose up --build
```
- Web: http://localhost:5173
- API (Swagger): http://localhost:8080/swagger
- Postgres: localhost:5432 (user: `postgres`, password: `postgres`, db: `sched_db`)

## Variáveis de ambiente (dev)
Veja `docker-compose.yml`. Em produção, configure via **GitHub Secrets** e variáveis do ambiente do seu provedor.

## Migrations
O API chama `Database.Migrate()` no startup. Um **migration inicial** já está incluso em `backend/src/AppointmentApi/Migrations/`.
Se você alterar o modelo, gere nova migration:
```bash
# dentro do container api (ou localmente com .NET 8 + dotnet-ef):
dotnet ef migrations add NovaMudanca
dotnet ef database update
```

## Notificações por e-mail (stub)
Troque o `ConsoleEmailSender` por um provedor real (SMTP/SendGrid) em `Services/Email`.
Defina `Email__From` e outras variáveis conforme seu provedor.

## GitHub — criar repositório e fazer o primeiro push
```bash
git init
git checkout -b main
git add .
git commit -m "chore: initial commit (agendamento v2)"
# substitua <usuario> e <repo>
git remote add origin https://github.com/<usuario>/<repo>.git
git push -u origin main
```

### Workflows
- `.github/workflows/backend.yml`: build .NET, publica artefatos (opcional Docker).
- `.github/workflows/frontend.yml`: build React (opcional Pages).
- `.github/workflows/compose-smoke.yml`: sobe o `docker-compose` em CI e checa `/swagger`.

## Rotas principais
- Auth: `POST /auth/register`, `POST /auth/login`
- Services: `GET /services`, `POST /services`
- Availability: `GET /availability`, `POST /availability`
- Appointments: `GET /appointments?from=&to=`, `POST /appointments`, `PUT /appointments/{id}`, `DELETE /appointments/{id}`
