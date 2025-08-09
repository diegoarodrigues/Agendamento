using Backend.Models;

namespace Backend.Repositories;

public interface IClientRepository
{
    Task<Client?> GetByEmailAsync(string email);
    Task<Client?> GetByIdAsync(int id);
    Task<Client> AddAsync(Client client);
}
