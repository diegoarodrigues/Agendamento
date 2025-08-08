using AgendamentoApi.Models;
using AgendamentoApi.Data;
using Microsoft.EntityFrameworkCore;

namespace AgendamentoApi.Repositories;

public class ClientRepository : IClientRepository
{
    private readonly ApplicationDbContext _context;
    public ClientRepository(ApplicationDbContext context) => _context = context;

    public async Task<Client?> GetByEmailAsync(string email) =>
        await _context.Clients.FirstOrDefaultAsync(c => c.Email == email);

    public async Task AddAsync(Client client)
    {
        _context.Clients.Add(client);
        await _context.SaveChangesAsync();
    }
}
