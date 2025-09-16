using LibraryManagementSystem.Data;
using LibraryMangaementSystem.Dto;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LibraryMangaementSystem.Controllers
{
    [Route("api/EmployeeLogin")]
    [ApiController]
    public sealed class EmployeeLoginController : ControllerBase
    {
        private readonly RegistrationContext registrationContext;
        public EmployeeLoginController(RegistrationContext context)
        {
            this.registrationContext = context; 
        }
        [HttpPost]
        public IActionResult Login([FromBody] EmployeeLoginRequestDto model) 
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = registrationContext.Employee
              .FirstOrDefault(u => u.Email == model.Email && u.Password == model.Password);
            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }
            return Ok("Employee Login successful");

        }
    }
}
