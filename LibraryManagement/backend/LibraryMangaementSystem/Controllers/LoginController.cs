using LibraryManagementSystem.Data;
using LibraryMangaementSystem.Dto;

using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.Controllers
{
    [ApiController]
    [Route("/api/Login")]
    public sealed class LoginController: Controller
    {
        private readonly RegistrationContext _registrationContext;
        public LoginController(RegistrationContext context)
        {
            _registrationContext = context ?? throw new ArgumentNullException(nameof(context));
        }
        [HttpPost]
        public IActionResult Login([FromBody] LoginRequestDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = _registrationContext.Member
                .FirstOrDefault(u => u.Email == model.Email && u.Password == model.Password && u.Member_Type == model.Member_Type);
            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }
            return Ok("Login successful");
        }
      
    }
}
