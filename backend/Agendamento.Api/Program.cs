using Agendamento.Core.Interfaces;
using Agendamento.Core.Services;
using Agendamento.Infrastructure.Data;
using Agendamento.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connection = builder.Configuration.GetConnectionString("DefaultConnection") ?? builder.Configuration["DATABASE_URL"];
builder.Services.AddDbContext<AppDbContext>(o => o.UseNpgsql(connection));
builder.Services.AddScoped<IEventRepository, EventRepository>();
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(o => o.AddPolicy("all", p => p.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:5173")));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
    if (!db.Events.Any())
    {
        db.Events.AddRange(new []
        {
            new Agendamento.Core.Models.Event { Title = "Reunião", Start = DateTimeOffset.Now.AddHours(1), End = DateTimeOffset.Now.AddHours(2) },
            new Agendamento.Core.Models.Event { Title = "Almoço", Start = DateTimeOffset.Now.AddHours(3), End = DateTimeOffset.Now.AddHours(4) },
            new Agendamento.Core.Models.Event { Title = "Consulta", Start = DateTimeOffset.Now.AddDays(1), End = DateTimeOffset.Now.AddDays(1).AddHours(1) }
        });
        db.SaveChanges();
    }
}

app.UseCors("all");
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
