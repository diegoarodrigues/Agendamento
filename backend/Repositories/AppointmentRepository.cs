using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class AppointmentRepository : IAppointmentRepository
{
    private readonly AppDbContext _context;
    public AppointmentRepository(AppDbContext context) => _context = context;

    public async Task<List<Appointment>> GetByClientAsync(int clientId) =>
        await _context.Appointments.Where(a => a.ClientId == clientId).ToListAsync();

    public async Task<Appointment> AddAsync(Appointment appointment)
    {
        _context.Appointments.Add(appointment);
        await _context.SaveChangesAsync();
        return appointment;
    }

    public async Task<Appointment?> GetByIdAsync(int id, int clientId) =>
        await _context.Appointments.FirstOrDefaultAsync(a => a.Id == id && a.ClientId == clientId);

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

    public async Task<bool> ExistsConflictAsync(int clientId, DateTime dateTime, int? excludeId = null) =>
        await _context.Appointments.AnyAsync(a => a.ClientId == clientId && a.DateTime == dateTime && a.Id != excludeId);
}
