using System.ComponentModel.DataAnnotations;

namespace LibraryMangaementSystem.Dto
{
    public class Issue_BookDto
    {
        [Key]
        public int Issue_Id { get; set; } 
        public int BooksId { get; set; }
        public string Issued_Book_Name { get; set; }
        public int UserId { get; set; }
        public string Member_Type { get; set; } = String.Empty;
        public DateOnly Issue_Date { get; set; }
        public DateOnly Return_Date { get; set; }
        public int Over_Due { get; set; }

        public Issue_BookDto(int booksId, int userId, string member_Type, DateOnly issue_Date, DateOnly return_Date, int over_Due, string issued_Book_Name)
        {
            BooksId = booksId;
            UserId = userId;
            Member_Type = member_Type;
            Issue_Date = issue_Date;
            Return_Date = return_Date;
            Over_Due = over_Due;
            Issued_Book_Name = issued_Book_Name;
        }
    }
}
