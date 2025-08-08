using AgendamentoApi.DTOs;
using AgendamentoApi.Models;
using AgendamentoApi.Repositories;

namespace AgendamentoApi.Services;

public class AppointmentService
{
    private readonly IAppointmentRepository _appointments;

    public AppointmentService(IAppointmentRepository appointments)
    {
        _appointments = appointments;
    }

    public Task<List<Appointment>> GetByClientAsync(int clientId) =>
        _appointments.GetByClientAsync(clientId);

    public async Task<Appointment> CreateAsync(int clientId, AppointmentDto dto)
    {
        if (await _appointments.ExistsAtTimeAsync(clientId, dto.DateTime))
            throw new Exception("Já existe compromisso nesse horário");

        var appointment = new Appointment
        {
            ClientId = clientId,
            Title = dto.Title,
            Description = dto.Description,
            DateTime = dto.DateTime
        };
        await _appointments.AddAsync(appointment);
        return appointment;
    }

    public async Task UpdateAsync(int clientId, int id, AppointmentDto dto)
    {
        var appointment = await _appointments.GetByIdAsync(id)
            ?? throw new Exception("Compromisso não encontrado");

        if (appointment.ClientId != clientId)
            throw new Exception("Não autorizado");

        if (await _appointments.ExistsAtTimeAsync(clientId, dto.DateTime, id))
            throw new Exception("Já existe compromisso nesse horário");

        appointment.Title = dto.Title;
        appointment.Description = dto.Description;
        appointment.DateTime = dto.DateTime;
        await _appointments.UpdateAsync(appointment);
    }

    public async Task DeleteAsync(int clientId, int id)
    {
        var appointment = await _appointments.GetByIdAsync(id)
            ?? throw new Exception("Compromisso não encontrado");

        if (appointment.ClientId != clientId)
            throw new Exception("Não autorizado");

        await _appointments.DeleteAsync(appointment);
    }
}
