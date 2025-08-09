using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

public class AppDbContext : DbContext
{
    public DbSet<Client> Clients => Set<Client>();
    public DbSet<Appointment> Appointments => Set<Appointment>();

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Client>()
            .HasIndex(c => c.Email).IsUnique();

        modelBuilder.Entity<Appointment>()
            .HasIndex(a => new { a.ClientId, a.DateTime }).IsUnique();

        base.OnModelCreating(modelBuilder);
    }
}
