using Agendamento.Api.Models;

namespace Agendamento.Api.Data
{
    public static class SeedData
    {
        public static void Initialize(ApplicationDbContext context)
        {
            if (context.Events.Any()) return;

            var now = DateTime.UtcNow;
            var day = new DateTime(now.Year, now.Month, now.Day, 9, 0, 0, DateTimeKind.Utc);
            context.Events.AddRange(
                new Event
                {
                    Id = Guid.NewGuid(),
                    Title = "Reunião de equipe",
                    Start = day,
                    End = day.AddHours(1),
                    Color = "#3b82f6"
                },
                new Event
                {
                    Id = Guid.NewGuid(),
                    Title = "Almoço com cliente",
                    Start = day.AddHours(3),
                    End = day.AddHours(4),
                    Color = "#10b981"
                },
                new Event
                {
                    Id = Guid.NewGuid(),
                    Title = "Call do projeto",
                    Start = day.AddDays(1),
                    End = day.AddDays(1).AddHours(1),
                    Color = "#f59e0b"
                }
            );
            context.SaveChanges();
        }
    }
}
