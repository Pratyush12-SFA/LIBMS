using System.ComponentModel.DataAnnotations;

namespace LibraryMangaementSystem.Models
{
    public class Issued_Books
    {
        [Key]

        public int Issue_Id { get; set; }
        public int BooksId { get; set; }
        [Required]
        public required string Issued_Book_Name { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public string Member_Type { get; set; } = String.Empty;
        public DateTime Issue_Date { get; set; }
        public DateTime Return_Date { get; set; }
        public int Over_Due { get; set; }

    }
}
