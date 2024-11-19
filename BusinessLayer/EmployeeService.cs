using DataLayer.Entities;
using DataLayer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class EmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<List<Employee>> GetAllEmployeesAsync()
        {
            return await _employeeRepository.GetAllEmployeesAsync();
        }

        public async Task<Employee?> GetEmployeeByIdAsync(int id)
        {
            var employee = await _employeeRepository.GetEmployeeByIdAsync(id);
            return employee;
        }

        public async Task AddEmployee(Employee employee)
        {    
           await _employeeRepository.AddEmployeeAsync(employee);
        }

        public async Task DeleteEmployee(int id)
        {
            var employee = await _employeeRepository.GetEmployeeByIdAsync(id);
            await _employeeRepository.DeleteEmployeeAsync(id);
        }

        public async Task UpdateEmployee(Employee employee)
        { 
            var existingEmployee = await _employeeRepository.GetEmployeeByIdAsync(employee.Id);
            await _employeeRepository.UpdateEmployeeAsync(employee);
        }
    }
}
