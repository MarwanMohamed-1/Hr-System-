using BusinessLayer;
using Hr.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
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
        public LoginController(EmployeeService employeeService,IConfiguration configuration)
        {
            _employeeService = employeeService;
            _configuration = configuration;
        }
        [HttpPost]
        public async Task<ActionResult> Login(LoginDto loginDto)
        {
            if (loginDto == null)
            {
                return BadRequest("Invalid login data.");
            }

            var employee = await _employeeService.GetEmployeeByEmail(loginDto.email);
            if (employee == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            if (!VerifyPassword(loginDto.password, employee.Password))
            {
                return Unauthorized("Invalid email or password.");
            }
            var token = GenerateToken(employee.Email,employee.Role);
            return Ok(new { token,employee.Role });
        }
        private bool VerifyPassword(string inputPassword, string storedPassword)
        {
            return inputPassword == storedPassword;
        }
        //private string GenerateToken(string userEmail)
        //{
        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var secretKey = _configuration["Jwt:SecretKey"]; // Replace with an environment variable or secure key storage
        //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

        //    var tokenDescriptor = new SecurityTokenDescriptor
        //    {
        //        Subject = new ClaimsIdentity(new[] { new Claim("id", userEmail) }),
        //        Expires = DateTime.UtcNow.AddDays(2),
        //        SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
        //    };

        //    var token = tokenHandler.CreateToken(tokenDescriptor);
        //    return tokenHandler.WriteToken(token);
        //}
        private string GenerateToken(string userEmail, string role)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var secretKey = _configuration["Jwt:SecretKey"]; // The secret key used for signing the token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
            new Claim("id", userEmail),
            new Claim(ClaimTypes.Role, role) // Adding the role claim
        }),
                Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpirationMinutes"])),
                Issuer = _configuration["Jwt:Issuer"],       // Adding the issuer
                Audience = _configuration["Jwt:Audience"],   // Adding the audience
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


    }
}