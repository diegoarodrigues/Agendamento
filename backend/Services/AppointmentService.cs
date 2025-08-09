using Backend.DTOs;
using Backend.Models;
using Backend.Repositories;

namespace Backend.Services;

public class AppointmentService
{
    private readonly IAppointmentRepository _appointments;

    public AppointmentService(IAppointmentRepository appointments)
    {
        _appointments = appointments;
    }

    public async Task<List<AppointmentDto>> GetByClientAsync(int clientId)
    {
        var list = await _appointments.GetByClientAsync(clientId);
        return list.Select(a => new AppointmentDto(a.Id, a.Title, a.Description, a.DateTime)).ToList();
    }

    public async Task<AppointmentDto> AddAsync(int clientId, AppointmentCreateDto dto)
    {
        if (await _appointments.ExistsConflictAsync(clientId, dto.DateTime))
            throw new Exception("Horário já reservado");

        var appointment = new Appointment
        {
            ClientId = clientId,
            Title = dto.Title,
            Description = dto.Description,
            DateTime = dto.DateTime
        };

        var created = await _appointments.AddAsync(appointment);
        return new AppointmentDto(created.Id, created.Title, created.Description, created.DateTime);
    }

    public async Task UpdateAsync(int clientId, int id, AppointmentCreateDto dto)
    {
        var appointment = await _appointments.GetByIdAsync(id, clientId) ?? throw new Exception("Não encontrado");

        if (await _appointments.ExistsConflictAsync(clientId, dto.DateTime, id))
            throw new Exception("Horário já reservado");

        appointment.Title = dto.Title;
        appointment.Description = dto.Description;
        appointment.DateTime = dto.DateTime;

        await _appointments.UpdateAsync(appointment);
    }

    public async Task DeleteAsync(int clientId, int id)
    {
        var appointment = await _appointments.GetByIdAsync(id, clientId) ?? throw new Exception("Não encontrado");
        await _appointments.DeleteAsync(appointment);
    }
}
