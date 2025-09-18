using System.ComponentModel.DataAnnotations;
namespace LibraryManagementSystem.Dto
{
    public class RegistrationRequestDto
    {
        [StringLength(maximumLength: 200, MinimumLength = 3)]
        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Member_Type { get; set; } = string.Empty;
    }
}
