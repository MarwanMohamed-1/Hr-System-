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
        private readonly IVacationRequestRepository _vacationRequest;
        public VacationRequestService(IVacationRequestRepository vacationRequest)
        {
            _vacationRequest = vacationRequest;
        }
        
    }
}
