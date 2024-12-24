using DataLayer.Entities;
using DataLayer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class VacationRequestService
    {
        private readonly IVacationRequestRepository _vacationRequestRepository;
        public VacationRequestService(IVacationRequestRepository vacationRequest)
        {
            _vacationRequestRepository = vacationRequest;
        }
        public async Task<List<VacationRequest>>GetVacationRequestsAsync()
        {
            return await _vacationRequestRepository.GetAllRequestsAsync();
        }
        public async Task AddNewRequest(VacationRequest r)
        {
             await _vacationRequestRepository.CreateRequestAsync(r);
        }
    }
}
