using Microsoft.Identity.Client;
namespace LibraryMangaementSystem.Dto
{
    public class LoginDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;



        public LoginDto(string email, string password)
        {
            Email = email;
            Password = password;
  
        }

    }
}
