using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Backend.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Authorize]
[Route("appointments")]
public class AppointmentsController : ControllerBase
{
    private readonly AppointmentService _service;
    public AppointmentsController(AppointmentService service) => _service = service;

    private int GetClientId() => int.Parse(User.FindFirstValue(JwtRegisteredClaimNames.Sub)!);

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var clientId = GetClientId();
        return Ok(await _service.GetByClientAsync(clientId));
    }

    [HttpPost]
    public async Task<IActionResult> Create(AppointmentCreateDto dto)
    {
        try
        {
            var clientId = GetClientId();
            var result = await _service.AddAsync(clientId, dto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, AppointmentCreateDto dto)
    {
        try
        {
            var clientId = GetClientId();
            await _service.UpdateAsync(clientId, id, dto);
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
            var clientId = GetClientId();
            await _service.DeleteAsync(clientId, id);
            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
