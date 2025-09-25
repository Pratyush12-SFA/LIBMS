using System.ComponentModel.DataAnnotations;

namespace LibraryMangaementSystem.Dto;

public class EmployeeRegRequestDto
{
    [StringLength(maximumLength: 200, MinimumLength = 3)]
    [Required]
    public string Name { get; set; } = string.Empty;
    [Required]
    public string Email { get; set; } = string.Empty;
    [Required]
    public string Password {  get; set; } = string.Empty;
    [Required]
    public string Phone { get; set; } = string.Empty;
    
}
