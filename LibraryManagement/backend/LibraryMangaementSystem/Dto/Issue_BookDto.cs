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
        public string Member_Name { get; set; }
        public string Member_Type { get; set; } = String.Empty;
        public DateTime Issue_Date { get; set; }
        public DateTime Return_Date { get; set; }
        public string Over_Due { get; set; }

        public Issue_BookDto(int Issueid,int booksId, int userId, string member_Name, string member_Type, DateTime issue_Date, DateTime return_Date, string over_Due, string issued_Book_Name)
        {
            Issue_Id = Issueid;
            BooksId = booksId;
            UserId = userId;
            Member_Type = member_Type;
            Member_Name = member_Name;
            Issue_Date = issue_Date;
            Return_Date = return_Date;
            Over_Due = over_Due;
            Issued_Book_Name = issued_Book_Name;


        }
    }
}
