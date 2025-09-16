using LibraryManagementSystem.Models;
using LibraryMangaementSystem.Models;
using Microsoft.EntityFrameworkCore;



namespace LibraryManagementSystem.Data
{
    public class RegistrationContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<Member> Member { get; set; }

        public DbSet<EmployeeRegistration> Employee { get; set; }
        public DbSet<Books> Books { get; set; }
    }
}
