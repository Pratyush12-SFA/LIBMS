using LibraryManagementSystem.Data;
using LibraryMangaementSystem.Dto;
using LibraryMangaementSystem.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LibraryManagementSystem.Controllers;

[Route("api/EmployeeRegistration")]
[ApiController]
public class EmployeeRegistrationController : ControllerBase
{
    private readonly RegistrationContext _registrationContext;

    public EmployeeRegistrationController(RegistrationContext context)
    {
        _registrationContext = context;
    }

    [HttpPost]
    public IActionResult Register([FromBody] EmployeeRegRequestDto model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        EmployeeRegistration emp = new EmployeeRegistration()
        {
            Name = model.Name,
            Email = model.Email,
            Password = model.Password,
            Phone = model.Phone
        };

        _registrationContext.Employee.Add(emp);
        _registrationContext.SaveChanges();

        return Ok("Employee registered is successfully");
    }
}

