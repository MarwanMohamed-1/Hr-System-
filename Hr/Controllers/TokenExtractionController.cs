using BusinessLayer;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace Hr.Controllers
{
    
    public class TokenExtractionController : LoginController
    {
        public TokenExtractionController(EmployeeService employeeService, IConfiguration configuration) : base(employeeService, configuration)
        {
        }

        [HttpGet]
        public IActionResult ExtractInfo()
        {
            // Extract the token from the Authorization header
            var authHeader = Request.Headers["Authorization"].ToString();
            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                return BadRequest(new { Message = "Token is missing or invalid." });
            }

            var token = authHeader.Substring("Bearer ".Length).Trim();

            try
            {
                // Decode the JWT token
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadJwtToken(token);

                // Extract claims
                var claims = jwtToken.Claims.Select(c => new { c.Type, c.Value }).ToList();

                return Ok(new
                {
                    Message = "Token Information",
                    Claims = claims
                });
            }
            catch
            {
                return BadRequest(new { Message = "Failed to decode the token. Ensure it's a valid JWT." });
            }
        }
    }
}
