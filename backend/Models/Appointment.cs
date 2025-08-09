namespace Backend.Models;

public class Appointment
{
    public int Id { get; set; }
    public int ClientId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime DateTime { get; set; }
    public Client? Client { get; set; }
}
