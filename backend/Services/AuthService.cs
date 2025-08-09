using Backend.DTOs;
using Backend.Models;
using Backend.Repositories;

namespace Backend.Services;

public class AuthService
{
    private readonly IClientRepository _clients;
    private readonly JwtService _jwt;

    public AuthService(IClientRepository clients, JwtService jwt)
    {
        _clients = clients;
        _jwt = jwt;
    }

    public async Task<Client> RegisterAsync(RegisterDto dto)
    {
        var existing = await _clients.GetByEmailAsync(dto.Email);
        if (existing != null) throw new Exception("Email já cadastrado");

        var client = new Client
        {
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        return await _clients.AddAsync(client);
    }

    public async Task<string> LoginAsync(LoginDto dto)
    {
        var client = await _clients.GetByEmailAsync(dto.Email);
        if (client == null || !BCrypt.Net.BCrypt.Verify(dto.Password, client.PasswordHash))
            throw new Exception("Credenciais inválidas");

        return _jwt.GenerateToken(client);
    }
}
