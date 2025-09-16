namespace LibraryManagementSystem.Dto;

public class EmployeeRegDto
{
    public int EmployeeID { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
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
