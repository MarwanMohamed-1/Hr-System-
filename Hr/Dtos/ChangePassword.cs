using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Hr.Dtos
{
    public class ChangePassword
    {
        [PasswordPropertyText]
        public string OldPassword { get; set; }
        [PasswordPropertyText]
        public string NewPassword { get; set; }
        [PasswordPropertyText]
        public string ConfirmPassword { get; set; }
        [EmailAddress]
        public string Email { get; set; }
    }
}
