using AgendamentoApi.Models;
using AgendamentoApi.Data;
using Microsoft.EntityFrameworkCore;

namespace AgendamentoApi.Repositories;

public class AppointmentRepository : IAppointmentRepository
{
    private readonly ApplicationDbContext _context;
    public AppointmentRepository(ApplicationDbContext context) => _context = context;

    public async Task<List<Appointment>> GetByClientAsync(int clientId) =>
        await _context.Appointments.Where(a => a.ClientId == clientId).ToListAsync();

    public async Task<Appointment?> GetByIdAsync(int id) =>
        await _context.Appointments.FindAsync(id);

    public async Task AddAsync(Appointment appointment)
    {
        _context.Appointments.Add(appointment);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Appointment appointment)
    {
        _context.Appointments.Update(appointment);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Appointment appointment)
    {
        _context.Appointments.Remove(appointment);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> ExistsAtTimeAsync(int clientId, DateTime dateTime, int? ignoreId = null)
    {
        return await _context.Appointments.AnyAsync(a =>
            a.ClientId == clientId && a.DateTime == dateTime && (ignoreId == null || a.Id != ignoreId));
    }
}
