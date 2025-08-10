using Agendamento.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Agendamento.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Event> Events => Set<Event>();
    }
}
