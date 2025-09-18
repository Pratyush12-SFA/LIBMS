using Microsoft.Identity.Client;

namespace LibraryManagementSystem.Dto
{
    public class RegistrationDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;
        public string Phone { get; set; } 
        public string Member_Type { get; set; } = string.Empty;

        public RegistrationDto(int id, string name, string email, string password, string phone, string member_type)
        {
            Id = id;
            Name = name;
            Email = email;
            Password = password;
            Phone = phone;
            Member_Type = member_type;
        }
    }
}
