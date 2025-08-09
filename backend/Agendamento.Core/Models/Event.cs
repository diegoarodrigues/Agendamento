namespace Agendamento.Core.Models;

public class Event
{
    public Guid Id { get; set; }
    public string Title { get; set; } = default!;
    public DateTimeOffset Start { get; set; }
    public DateTimeOffset End { get; set; }
    public string? Location { get; set; }
    public string? Description { get; set; }
    public string? Color { get; set; }
    public int? RemindMinutesBefore { get; set; }
}
