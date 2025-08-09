using Agendamento.Core.Models;

namespace Agendamento.Core.Interfaces;

public interface IEventRepository
{
    Task<List<Event>> GetBetweenAsync(DateTimeOffset? from, DateTimeOffset? to, string? q);
    Task<Event?> GetAsync(Guid id);
    Task<Event> AddAsync(Event ev);
    Task<Event> UpdateAsync(Event ev);
    Task DeleteAsync(Guid id);
    Task<List<Event>> GetAllAsync();
}
