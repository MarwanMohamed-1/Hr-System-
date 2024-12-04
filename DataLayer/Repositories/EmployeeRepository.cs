using DataLayer.EfContext;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IUnitOfWork _unitOfWork;
        public EmployeeRepository(ApplicationDbContext context,IUnitOfWork unitOfWork)
        {
            _context = context;
            _unitOfWork = unitOfWork;
        }
        public async Task AddEmployeeAsync(Employee employee)
        {
            _context.Employees.Add(employee);
            //await _context.SaveChangesAsync();
            await _unitOfWork.SaveChange();
        }
        public async Task DeleteEmployeeAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee != null)
            {
                _context.Employees.Remove(employee);
                await _unitOfWork.SaveChange();
            }
        }
        public async Task<List<Employee>> GetAllEmployeesAsync()
        {
            return await _context.Employees.ToListAsync();
        }

        public async Task<Employee?> GetEmployeeByIdAsync(int id)
        {
            var emp = await _context.Employees.FindAsync(id);
            return emp;
        }
        public async Task UpdateEmployeeAsync(Employee employee)
        {
            var existingEmployee = await _context.Employees.FindAsync(employee.Id);
            if (existingEmployee != null)
            {
                existingEmployee.Name = employee.Name;
                existingEmployee.Role = employee.Role;
                existingEmployee.Salary = employee.Salary;
                existingEmployee.Email= employee.Email;
                existingEmployee.Password= employee.Password;
                existingEmployee.Address = employee.Address;
                existingEmployee.Age = employee.Age;
                await _unitOfWork.SaveChange();
            }
            else
            {
                throw new KeyNotFoundException("Employee not found");
            }
        }
        public async Task<Employee?> GetEmployeeByEmail(string email)
        {
            return await _context.Employees.FirstOrDefaultAsync(e => e.Email == email);
        }   
    }
}
