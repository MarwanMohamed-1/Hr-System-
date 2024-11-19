using BusinessLayer;
using DataLayer.EfContext;
using DataLayer.Entities;
using DataLayer.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;


namespace Hr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService _employeeService;
        public EmployeeController(EmployeeService employeeService)
        {
            _employeeService = employeeService;
        }
        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetAllEmployees()
        {
            var employees = await _employeeService.GetAllEmployeesAsync();
            return Ok(employees); // Return a 200 OK response with the list of employees
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmpById(int id)
        {
            if(id < 0)
            {
                return BadRequest();
            }
            var employee = await _employeeService.GetEmployeeByIdAsync(id);
            if (employee == null)
            {
                return BadRequest();
            }
            return Ok(employee);
        }
    }
}
