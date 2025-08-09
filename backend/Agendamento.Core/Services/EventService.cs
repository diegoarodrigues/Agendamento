using Agendamento.Core.DTOs;
using Agendamento.Core.Interfaces;
using Agendamento.Core.Models;

namespace Agendamento.Core.Services;

public class EventService : IEventService
{
    private readonly IEventRepository _repo;

    public EventService(IEventRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<EventDto>> GetAsync(DateTimeOffset? from, DateTimeOffset? to, string? q)
    {
        var events = await _repo.GetBetweenAsync(from, to, q);
        return events.Select(e => ToDto(e, events)).ToList();
    }

    public async Task<EventDto?> GetAsync(Guid id)
    {
        var ev = await _repo.GetAsync(id);
        if (ev == null) return null;
        var all = await _repo.GetAllAsync();
        return ToDto(ev, all);
    }

    public async Task<EventDto> CreateAsync(EventDto dto)
    {
        var ev = await _repo.AddAsync(ToEntity(dto));
        var all = await _repo.GetAllAsync();
        return ToDto(ev, all);
    }

    public async Task<EventDto> UpdateAsync(Guid id, EventDto dto)
    {
        var ev = await _repo.GetAsync(id) ?? throw new KeyNotFoundException();
        ev.Title = dto.Title;
        ev.Start = dto.Start;
        ev.End = dto.End;
        ev.Location = dto.Location;
        ev.Description = dto.Description;
        ev.Color = dto.Color;
        ev.RemindMinutesBefore = dto.RemindMinutesBefore;
        await _repo.UpdateAsync(ev);
        var all = await _repo.GetAllAsync();
        return ToDto(ev, all);
    }

    public Task DeleteAsync(Guid id) => _repo.DeleteAsync(id);

    private static EventDto ToDto(Event ev, IEnumerable<Event> all)
    {
        var hasConflict = all.Any(o => o.Id != ev.Id && o.Start < ev.End && ev.Start < o.End);
        return new EventDto
        {
            Id = ev.Id,
            Title = ev.Title,
            Start = ev.Start,
            End = ev.End,
            Location = ev.Location,
            Description = ev.Description,
            Color = ev.Color,
            RemindMinutesBefore = ev.RemindMinutesBefore,
            HasConflict = hasConflict
        };
    }

    private static Event ToEntity(EventDto dto)
    {
        return new Event
        {
            Id = dto.Id == Guid.Empty ? Guid.NewGuid() : dto.Id,
            Title = dto.Title,
            Start = dto.Start,
            End = dto.End,
            Location = dto.Location,
            Description = dto.Description,
            Color = dto.Color,
            RemindMinutesBefore = dto.RemindMinutesBefore
        };
    }
}
