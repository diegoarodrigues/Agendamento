using Backend.Models;

namespace Backend.Repositories;

public interface IAppointmentRepository
{
    Task<List<Appointment>> GetByClientAsync(int clientId);
    Task<Appointment> AddAsync(Appointment appointment);
    Task<Appointment?> GetByIdAsync(int id, int clientId);
    Task UpdateAsync(Appointment appointment);
    Task DeleteAsync(Appointment appointment);
    Task<bool> ExistsConflictAsync(int clientId, DateTime dateTime, int? excludeId = null);
}
