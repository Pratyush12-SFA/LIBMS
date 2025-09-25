using System.ComponentModel.DataAnnotations;
namespace LibraryMangaementSystem.Models;

public class MemberLogin
{
    
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
