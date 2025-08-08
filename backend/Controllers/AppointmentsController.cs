using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using AgendamentoApi.DTOs;
using AgendamentoApi.Models;
using AgendamentoApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AgendamentoApi.Controllers;

[ApiController]
[Authorize]
[Route("/appointments")]
public class AppointmentsController : ControllerBase
{
    private readonly AppointmentService _appointments;
    public AppointmentsController(AppointmentService appointments) => _appointments = appointments;

    private int ClientId => int.Parse(User.FindFirstValue(JwtRegisteredClaimNames.Sub)!);

    [HttpGet]
    public async Task<ActionResult<List<Appointment>>> Get()
    {
        var list = await _appointments.GetByClientAsync(ClientId);
        return Ok(list);
    }

    [HttpPost]
    public async Task<IActionResult> Create(AppointmentDto dto)
    {
        try
        {
            var appt = await _appointments.CreateAsync(ClientId, dto);
            return Ok(appt);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, AppointmentDto dto)
    {
        try
        {
            await _appointments.UpdateAsync(ClientId, id, dto);
            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _appointments.DeleteAsync(ClientId, id);
            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
