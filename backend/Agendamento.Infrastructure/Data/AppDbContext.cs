using Agendamento.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Agendamento.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public DbSet<Event> Events => Set<Event>();

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Event>(e =>
        {
            e.Property(p => p.Title).IsRequired();
            e.HasIndex(p => new { p.Start, p.End });
        });
    }
}
