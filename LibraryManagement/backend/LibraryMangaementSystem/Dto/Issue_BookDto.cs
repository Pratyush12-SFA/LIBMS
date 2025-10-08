using System.ComponentModel.DataAnnotations;

namespace LibraryMangaementSystem.Dto
{
    public class Issue_BookDto(int Issueid, int booksId, int userId, string member_Name, string member_Type, DateOnly issue_Date, DateOnly return_Date, string over_Due, string issued_Book_Name)
    {
        [Key]
        public int Issue_Id { get; set; } = Issueid;
        public int BooksId { get; set; } = booksId;
        public string Issued_Book_Name { get; set; } = issued_Book_Name;
        public int UserId { get; set; } = userId;
        public string Member_Name { get; set; } = member_Name;
        public string Member_Type { get; set; } = member_Type;
        public DateOnly Issue_Date { get; set; } = issue_Date;
        public DateOnly Return_Date { get; set; } = return_Date;
        public string Over_Due { get; set; } = over_Due;
    }
}
