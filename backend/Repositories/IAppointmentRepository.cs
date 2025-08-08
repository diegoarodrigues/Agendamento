using AgendamentoApi.Models;

namespace AgendamentoApi.Repositories;

public interface IAppointmentRepository
{
    Task<List<Appointment>> GetByClientAsync(int clientId);
    Task<Appointment?> GetByIdAsync(int id);
    Task AddAsync(Appointment appointment);
    Task UpdateAsync(Appointment appointment);
    Task DeleteAsync(Appointment appointment);
    Task<bool> ExistsAtTimeAsync(int clientId, DateTime dateTime, int? ignoreId = null);
}
