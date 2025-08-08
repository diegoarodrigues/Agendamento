using AgendamentoApi.Models;

namespace AgendamentoApi.Repositories;

public interface IClientRepository
{
    Task<Client?> GetByEmailAsync(string email);
    Task AddAsync(Client client);
}
