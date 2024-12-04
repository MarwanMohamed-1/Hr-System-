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
            if (employees == null|| !employees.Any())
            {
                return NotFound("No employees found.");
            }
            return Ok(employees); 
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Employee>> GetEmpById(int id)
        {
            if(id < 0)
            {
                return BadRequest("Id Cannot be Negative");
            }
            var employee = await _employeeService.GetEmployeeByIdAsync(id);
            if (employee == null)
            {
                return NotFound("This Employee is NotFound");
            }
            return Ok(employee);
        }
        [HttpPost]
        public async Task<ActionResult> AddEmployee(Employee employee)
        {
            await _employeeService.AddEmployee(employee);
            return CreatedAtAction(nameof(GetEmpById), new { id = employee.Id }, employee);
        }
        [HttpPut]
        public async Task<ActionResult> UpdateEmployee(Employee employee)
        {
            var existingEmployee = await _employeeService.GetEmployeeByIdAsync(employee.Id);
            if (existingEmployee == null)
            {
                return NotFound("Employee not found.");
            }
            await _employeeService.UpdateEmployee(employee);
            return Ok(employee); 
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            if (id < 0)
            {
                return BadRequest("Invalid ID.");
            }

            var employeeExists = await _employeeService.GetEmployeeByIdAsync(id);
            if (employeeExists == null)
            {
                return NotFound("Employee not found.");
            }

            await _employeeService.DeleteEmployee(id);
            return NoContent();
        }
        [HttpGet("email/{email}")]
        public async Task<ActionResult<Employee>> GetByEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email) || !email.Contains("@"))
            {
                return BadRequest("Invalid email address.");
            }

            var Employee =await  _employeeService.GetEmployeeByEmail(email);
            if (Employee == null) 
            { 
                return NotFound("This email is not existed");
            }
            return Ok(Employee);
        }
        
    }
}
