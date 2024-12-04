using DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Repositories
{
    public interface IVacationRequestRepository
    {
        Task<VacationRequest> CreateRequestAsync(VacationRequest request);
        Task<VacationRequest> GetRequestByIdAsync(int id);
        Task<VacationRequest> GetRequestByEmailAsync(string email);
        Task<IEnumerable<VacationRequest>> GetAllRequestsAsync();
        Task<IEnumerable<VacationRequest>> GetRequestsByEmployeeIdAsync(int employeeId);
        Task<VacationRequest> UpdateRequestStatusAsync(int id, string status);
    }
}
