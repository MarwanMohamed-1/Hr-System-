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
        private readonly IUnitOfWork _unitOfWork;

        public VacationRequestRepository(ApplicationDbContext context,IUnitOfWork unitOfWork) 
        {
            _context = context;
            _unitOfWork = unitOfWork;
        }
        public async Task CreateRequestAsync(VacationRequest request)
        {
            _context.VacationRequests.Add(request);
            await _unitOfWork.SaveChange();
        }

        public async Task<List<VacationRequest>> GetAllRequestsAsync()
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
