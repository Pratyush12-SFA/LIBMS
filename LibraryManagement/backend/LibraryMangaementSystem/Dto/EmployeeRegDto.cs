using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.Dto;

public class EmployeeRegDto
{
    public int EmployeeID { get; set; }
    [Required]
    public string Name { get; set; } = string.Empty;
    [Required]
    public string Email { get; set; } = string.Empty;
    [Required]
    public string Password { get; set; } = string.Empty;
    [Required]
      public string Phone { get; set; } = string.Empty;



    public EmployeeRegDto( int employeeid, string name, string email, string password, string phone) 
    {
        EmployeeID = employeeid;
        Name = name;
        Email = email;
        Password = password;
        Phone = phone;

    }
}
