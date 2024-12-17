using BusinessLayer;
using DataLayer.Entities;
using Hr.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Hr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly EmployeeService _employeeService;
        private readonly IConfiguration _configuration;

        public LoginController(EmployeeService employeeService, IConfiguration configuration)
        {
            _employeeService = employeeService;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<ActionResult> Login(LoginDto loginDto)
        {
            if (loginDto == null) return BadRequest("Invalid login data.");

            var employee = await _employeeService.GetEmployeeByEmail(loginDto.email);
            if (employee == null || !VerifyPassword(loginDto.password, employee.Password))
            {
                return Unauthorized("Invalid email or password.");
            }

            var token = GenerateToken(employee);
            return Ok(new { token, employee.Role });
        }

        private bool VerifyPassword(string inputPassword, string storedPassword)
        {
            return inputPassword == storedPassword;
        }

        private string GenerateToken(Employee employee)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var secretKey = _configuration["Jwt:SecretKey"];
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            var claims = new List<Claim>
            {
                new Claim("email", employee.Email),
                new Claim(ClaimTypes.Role, employee.Role),
                new Claim("id", employee.Id.ToString()),
                new Claim("name", employee.Name)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpirationMinutes"])),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
