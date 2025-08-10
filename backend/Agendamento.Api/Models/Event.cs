namespace Agendamento.Api.Models
{
    public class Event
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string? Location { get; set; }
        public string? Description { get; set; }
        public string? Color { get; set; }
        public int? RemindMinutesBefore { get; set; }
    }
}
