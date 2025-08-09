using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class ClientRepository : IClientRepository
{
    private readonly AppDbContext _context;
    public ClientRepository(AppDbContext context) => _context = context;

    public async Task<Client?> GetByEmailAsync(string email) =>
        await _context.Clients.FirstOrDefaultAsync(c => c.Email == email);

    public async Task<Client?> GetByIdAsync(int id) =>
        await _context.Clients.FindAsync(id);

    public async Task<Client> AddAsync(Client client)
    {
        _context.Clients.Add(client);
        await _context.SaveChangesAsync();
        return client;
    }
}
