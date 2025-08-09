namespace Backend.DTOs;

public record AppointmentDto(int Id, string Title, string? Description, DateTime DateTime);
public record AppointmentCreateDto(string Title, string? Description, DateTime DateTime);
