using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Entities
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Address { get; set; }
        public double? Salary { get; set; }
        public int? Age { get; set; }
        public string Role { get; set; } // "Normal" or "HR"
        public int VacationBalance { get; set; } = 21; // Default value is 21

        public string Email { get; set; } 
        public string Password { get; set; } 
    }
}
