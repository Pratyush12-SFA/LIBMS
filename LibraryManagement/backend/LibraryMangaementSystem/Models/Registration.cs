using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.Models;

public sealed class Member
{
    [Key]
    public int  UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Member_Type { get; set; } = string.Empty;
}
