using System.ComponentModel.DataAnnotations;

namespace Hr.Dtos
{
    public class VacationDto
    {
        [Required]
        [EmailAddress]
        public string email { get; set; }
        public int EmployeeId { get; set; }

        [Required]  
        [Range(1, int.MaxValue, ErrorMessage = "Requested days must be greater than 0.")]
        public int RequestedDays { get; set; }

        [StringLength(500, ErrorMessage = "Description is too long.")]
        public string ?Description { get; set; }

        public DateTime DateRequested { get; set; }

        public DateTime? DateApproved { get; set; }
    }
}
