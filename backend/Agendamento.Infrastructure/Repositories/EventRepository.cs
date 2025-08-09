using Agendamento.Core.Interfaces;
using Agendamento.Core.Models;
using Agendamento.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Agendamento.Infrastructure.Repositories;

public class EventRepository : IEventRepository
{
    private readonly AppDbContext _ctx;

    public EventRepository(AppDbContext ctx)
    {
        _ctx = ctx;
    }

    public async Task<Event> AddAsync(Event ev)
    {
        _ctx.Events.Add(ev);
        await _ctx.SaveChangesAsync();
        return ev;
    }

    public async Task DeleteAsync(Guid id)
    {
        var ev = await _ctx.Events.FindAsync(id);
        if (ev != null)
        {
            _ctx.Events.Remove(ev);
            await _ctx.SaveChangesAsync();
        }
    }

    public Task<List<Event>> GetAllAsync() => _ctx.Events.AsNoTracking().ToListAsync();

    public Task<Event?> GetAsync(Guid id) => _ctx.Events.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);

    public async Task<List<Event>> GetBetweenAsync(DateTimeOffset? from, DateTimeOffset? to, string? q)
    {
        var query = _ctx.Events.AsNoTracking().AsQueryable();
        if (from.HasValue) query = query.Where(e => e.End >= from.Value);
        if (to.HasValue) query = query.Where(e => e.Start <= to.Value);
        if (!string.IsNullOrWhiteSpace(q))
            query = query.Where(e => EF.Functions.ILike(e.Title, $"%{q}%") || EF.Functions.ILike(e.Description ?? "", $"%{q}%"));
        return await query.ToListAsync();
    }

    public async Task<Event> UpdateAsync(Event ev)
    {
        _ctx.Events.Update(ev);
        await _ctx.SaveChangesAsync();
        return ev;
    }
}
