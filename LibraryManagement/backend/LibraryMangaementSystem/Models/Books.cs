using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.Models
{
    public class Books
    {
        [Key]
        public int BooksId { get;set; }
        public string Book_Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string Publisher { get; set; } = string.Empty;
        public string Edition { get; set; } = string.Empty;
        public string ISBN { get; set; } = string.Empty;
        public DateOnly Published_Date { get; set; } 
    }
}
