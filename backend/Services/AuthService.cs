using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AgendamentoApi.DTOs;
using AgendamentoApi.Models;
using AgendamentoApi.Repositories;
using Microsoft.IdentityModel.Tokens;

namespace AgendamentoApi.Services;

public class AuthService
{
    private readonly IClientRepository _clients;
    private readonly IConfiguration _config;

    public AuthService(IClientRepository clients, IConfiguration config)
    {
        _clients = clients;
        _config = config;
    }

    public async Task<Client> RegisterAsync(RegisterDto dto)
    {
        var existing = await _clients.GetByEmailAsync(dto.Email);
        if (existing != null)
            throw new Exception("Email já cadastrado");

        var client = new Client
        {
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };
        await _clients.AddAsync(client);
        return client;
    }

    public async Task<string> LoginAsync(LoginDto dto)
    {
        var client = await _clients.GetByEmailAsync(dto.Email)
            ?? throw new Exception("Credenciais inválidas");

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, client.PasswordHash))
            throw new Exception("Credenciais inválidas");

        var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]!);
        var creds = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, client.Id.ToString())
        };

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddHours(double.Parse(_config["Jwt:ExpiresInHours"] ?? "2")),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
