using BusinessLayer;
using DataLayer.Entities;
using Hr.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VacationRequestController : ControllerBase
    {
        private readonly VacationRequestService _vacationRequestService;
        private readonly EmployeeService _employeeService;
        public VacationRequestController(EmployeeService employeeService,VacationRequestService vacationRequestService)
        {
            _vacationRequestService=vacationRequestService;
            _employeeService = employeeService; 
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAllRequests([FromQuery] string email)
        {
            var requests = await _vacationRequestService.GetVacationRequestsAsync();
            var employee = await _employeeService.GetEmployeeByEmail(email);

            if (!requests.Any())
            {
                return Ok(new { message = "No vacation requests found.", requests });
            }

            if (employee == null || employee.Role.ToLower() != "hr")
            {
                return Unauthorized(new { message = "You are not authorized to view all requests." });
            }

            return Ok(requests);
        }

        [HttpPost]
        public async Task<IActionResult>RequestAVacation(VacationDto request)
        {
            var employee = await _employeeService.GetEmployeeByEmail(request.email);
            if (employee == null)
            {
                return BadRequest("Employee Not Found");
            }
            if(request.RequestedDays <= 0)
            {
               return BadRequest("Enter Valid Number");
            }
            request.DateRequested = DateTime.UtcNow;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var vacationRequest = new VacationRequest
            {
                EmployeeId = request.EmployeeId,
                RequestedDays = request.RequestedDays,
                Description = request.Description,
                Status = "Pending", // Default status
                DateRequested = request.DateRequested,
                DateApproved = request.DateApproved,
                Employee = employee
            };
            await _vacationRequestService.AddNewRequest(vacationRequest);
            return Ok(request);
        }
    }
}
