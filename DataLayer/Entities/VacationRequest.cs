using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Entities
{
    public class VacationRequest
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; } // Foreign key to Employee
        public int RequestedDays { get; set; }
        public string Status { get; set; } // Pending, Approved, Rejected
        public DateTime DateRequested { get; set; }
        public DateTime? DateApproved { get; set; }

        // Navigation property to the Employee (this is how EF Core understands the relationship)
        public Employee Employee { get; set; }
    }
}
