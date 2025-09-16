namespace LibraryMangaementSystem.Dto;

public class EmployeeLoginDto
{
    public string Email { get; set; } = string.Empty;
    public string Passsword { get; set; } = string.Empty;

    public EmployeeLoginDto(string email, string passsword)
    {
        Email = email;
        Passsword = passsword;
    }
}
