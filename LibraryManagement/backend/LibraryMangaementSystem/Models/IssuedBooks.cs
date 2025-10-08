using System.ComponentModel.DataAnnotations;

namespace LibraryMangaementSystem.Models
{
    public class IssuedBooks
    {
        [Key]

        public int Issue_Id { get; set; }
        public int BooksId { get; set; }
    
        public string Issued_Book_Name { get; set; } =string.Empty;

        public int UserId { get; set; }
      
        public string Member_Name { get; set; } = string.Empty;
        public string Member_Type { get; set; } = string.Empty;
        public DateOnly Issue_Date { get; set; }
        public DateOnly Return_Date { get; set; }
        public string Over_Due { get; set; } = string.Empty;

    }
}
