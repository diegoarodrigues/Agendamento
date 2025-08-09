using Agendamento.Core.DTOs;
using Agendamento.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Agendamento.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private readonly IEventService _service;

    public EventsController(IEventService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<EventDto>>> Get([FromQuery] DateTimeOffset? from, [FromQuery] DateTimeOffset? to, [FromQuery] string? q)
    {
        return await _service.GetAsync(from, to, q);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<EventDto>> Get(Guid id)
    {
        var ev = await _service.GetAsync(id);
        if (ev == null) return NotFound();
        return ev;
    }

    [HttpPost]
    public async Task<ActionResult<EventDto>> Post(EventDto dto)
    {
        if (dto.End < dto.Start) return BadRequest();
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<EventDto>> Put(Guid id, EventDto dto)
    {
        if (dto.End < dto.Start) return BadRequest();
        var updated = await _service.UpdateAsync(id, dto);
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}
