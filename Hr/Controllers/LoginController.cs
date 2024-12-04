using BusinessLayer;
using Hr.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly EmployeeService _employeeService;
        public LoginController(EmployeeService employeeService)
        {
            _employeeService = employeeService;
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
            return Ok(employee);
        }
        private bool VerifyPassword(string inputPassword, string storedPassword)
        {
            return inputPassword == storedPassword;
        }

    }
}