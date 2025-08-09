using Agendamento.Core.DTOs;

namespace Agendamento.Core.Interfaces;

public interface IEventService
{
    Task<List<EventDto>> GetAsync(DateTimeOffset? from, DateTimeOffset? to, string? q);
    Task<EventDto?> GetAsync(Guid id);
    Task<EventDto> CreateAsync(EventDto dto);
    Task<EventDto> UpdateAsync(Guid id, EventDto dto);
    Task DeleteAsync(Guid id);
}
