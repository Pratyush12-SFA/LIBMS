using System.ComponentModel.DataAnnotations;

namespace LibraryMangaementSystem.Dto
{
    public class LoginRequestDto
    {
        [StringLength(maximumLength: 200, MinimumLength = 3)]
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
