using BusinessLayer;
using DataLayer.EfContext;
using DataLayer.Entities;
using Hr.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hr.Controllers
{
    
    public class ChangePasswordController : LoginController
    {
        private readonly EmployeeService employeeService;
        private readonly IConfiguration configuration;
        private readonly ApplicationDbContext context;
        public ChangePasswordController(EmployeeService employeeService, IConfiguration configuration,ApplicationDbContext applicationDbContext) : base(employeeService, configuration)
        {
            this.employeeService = employeeService;
            this.configuration = configuration;
            this.context = applicationDbContext;

        }

        [HttpPut("change-password")]
        public IActionResult ChangePassword(ChangePassword request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.OldPassword) ||
                string.IsNullOrWhiteSpace(request.NewPassword) ||
                string.IsNullOrWhiteSpace(request.ConfirmPassword))
            {
                return BadRequest(new { message = "All fields are required." });
            }

            var employee = context.Employees.FirstOrDefault(e => e.Email == request.Email);
            if (employee == null)
            {
                return NotFound(new { message = "Employee not found." });
            }

            if (employee.Password != request.OldPassword)
            {
                return BadRequest(new { message = "Old password is incorrect." });
            }

            if (request.NewPassword != request.ConfirmPassword)
            {
                return BadRequest(new { message = "New password and confirm password do not match." });
            }

            employee.Password = request.NewPassword;
            context.SaveChanges();

            return Ok(new { message = "Password changed successfully." });
        }


    }
}
