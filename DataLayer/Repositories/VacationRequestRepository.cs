using DataLayer.EfContext;
using DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.Repositories
{
    public class VacationRequestRepository : IVacationRequestRepository
    {
        private readonly ApplicationDbContext _context;
        public VacationRequestRepository(ApplicationDbContext context) 
        {
            _context = context;
        }
        public async Task<VacationRequest> CreateRequestAsync(VacationRequest request)
        {
            _context.VacationRequests.Add(request);
            await _context.SaveChangesAsync();
            return request;
        }

        public async Task<IEnumerable<VacationRequest>> GetAllRequestsAsync()
        {
            return await _context.VacationRequests.ToListAsync();
        }

        public Task<VacationRequest> GetRequestByEmailAsync(string email)
        {
            throw new NotImplementedException();
        }

        public Task<VacationRequest> GetRequestByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<VacationRequest>> GetRequestsByEmployeeIdAsync(int employeeId)
        {
            throw new NotImplementedException();
        }

        public Task<VacationRequest> UpdateRequestStatusAsync(int id, string status)
        {
            throw new NotImplementedException();
        }
    }
}
