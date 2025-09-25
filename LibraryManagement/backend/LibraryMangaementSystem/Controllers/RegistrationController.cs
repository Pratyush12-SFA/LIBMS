using LibraryManagementSystem.Models;
using LibraryManagementSystem.Data;
using LibraryManagementSystem.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Controllers
{
    [Route("/api/Registration")]
    public sealed class RegistrationController : Controller
    {
        private readonly RegistrationContext _registrationContext;

        public RegistrationController(RegistrationContext context)
        {
            _registrationContext = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpPost]
        public IActionResult Register([FromBody] RegistrationRequestDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Member reg = new Member()
            {
                Name = model.Name,
                Email = model.Email,
                Password = model.Password,
                Phone = model.Phone,
                Member_Type = model.Member_Type
            };

            _registrationContext.Member.Add(reg);
            _registrationContext.SaveChanges();

            return Ok("Registration is success");
        }
    }
}
