//using LibraryManagementSystem.Data;
//using LibraryManagementSystem.Models;
//using LibraryMangaementSystem.Models;
//using Microsoft.AspNetCore.Mvc;

//// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//namespace LibraryMangaementSystem.Controllers;

//[Route("api/Issued_Books")]
//[ApiController]
//public class Issued_BooksCOntroller : ControllerBase
//{
//    private readonly RegistrationContext _registrationContext;
//    public Issued_BooksCOntroller(RegistrationContext context)
//    {
//        _registrationContext = context;
//    }
//    [HttpGet("GetIssuedBooks")]
//    public IActionResult GetIssuedBooks()
//    {
//        var issuedBooks = _registrationContext.Issued_Books.ToList();
//        return Ok(issuedBooks);
//    }


//    [HttpPost("IssueBook")]
//    public IActionResult IssueBook([FromBody] Models.Issued_Books issued_Books)
//    {

//        var book = _registrationContext.Books.FirstOrDefault(b => b.BooksId == issued_Books.BooksId);
//        var member = _registrationContext.Member.FirstOrDefault(m => m.UserId == issued_Books.UserId);

//        if (book == null)
//        {
//            return NotFound("Book not found.");
//        }

//        if (member == null)
//        {
//            return NotFound("Member not found.");
//        }


//        issued_Books.Issued_Book_Name = book.Book_Name;
//        issued_Books.Member_Type = member.Member_Type;


//        if (issued_Books.Member_Type == "Standard")
//        {
//            issued_Books.Return_Date = issued_Books.Issue_Date.AddDays(15);
//        }
//        else if (issued_Books.Member_Type == "Premium")
//        {
//            issued_Books.Return_Date = issued_Books.Issue_Date.AddDays(21);
//        }
//        else
//        {
//            return BadRequest("Invalid member type.");
//        }


//        issued_Books.Issue_Date = DateTime.Now.Date;


//        _registrationContext.Issued_Books.Add(issued_Books);
//        _registrationContext.SaveChanges();

//        return Ok("Book issued successfully.");
//    }

//    [HttpDelete]

//    public IActionResult DeleteIssuedBook(int id)
//    {
//        var issuedBook = _registrationContext.Issued_Books.FirstOrDefault(ib => ib.Issue_Id == id);
//        if (issuedBook == null)
//        {
//            return NotFound("Issued book record not found.");
//        }
//        _registrationContext.Issued_Books.Remove(issuedBook);
//        _registrationContext.SaveChanges();
//        return Ok("Issued book record deleted successfully.");
//    }
//    [HttpPut("{id}")]
//    public IActionResult UpdateIssuedBook(int id, [FromBody] Issued_Books updateIssuedBook)
//    {

//        var issuedBook = _registrationContext.Issued_Books.FirstOrDefault(i => i.Issue_Id == id);

//        if (issuedBook == null)
//        {
//            return NotFound("Issued book record not found.");
//        }


//        var member = _registrationContext.Member.Find(updateIssuedBook.UserId);
//        if (member == null)
//        {
//            return BadRequest("Member not found. Cannot update issued book record with a non-existent member ID.");
//        }


//        var book = _registrationContext.Books.Find(updateIssuedBook.BooksId);
//        if (book == null)
//        {
//            return BadRequest("Book not found. Cannot update issued book record with a non-existent book ID.");
//        }


//        issuedBook.Issued_Book_Name = updateIssuedBook.Issued_Book_Name;
//        issuedBook.Return_Date = updateIssuedBook.Return_Date;
//        issuedBook.Issue_Date = updateIssuedBook.Issue_Date;
//        issuedBook.UserId = updateIssuedBook.UserId;
//        issuedBook.BooksId = updateIssuedBook.BooksId;
//        issuedBook.Member_Type = updateIssuedBook.Member_Type;
//        issuedBook.Over_Due = updateIssuedBook.Over_Due;
//        _registrationContext.Issued_Books.Update(issuedBook);
//        _registrationContext.SaveChanges();

//        return Ok(issuedBook+"Issued book record updated successfully.");
//    }
//}



using LibraryManagementSystem.Data;
using LibraryManagementSystem.Models;
using LibraryMangaementSystem.Models;
using Microsoft.AspNetCore.Mvc;
using static System.Reflection.Metadata.BlobBuilder;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LibraryManagementSystem.Controllers;

[Route("api/Issued_Books")]
[ApiController]
public class Issued_BooksController : ControllerBase
{
    private readonly RegistrationContext _registrationContext;
    public Issued_BooksController(RegistrationContext context)
    {
        _registrationContext = context;
    }

    [HttpGet("GetIssuedBooks")]
    public IActionResult GetIssuedBooks()
    {
        var issuedBooks = _registrationContext.IssuedBooks.ToList();
        return Ok(issuedBooks);
    }

    [HttpGet("{id}")]
    public IActionResult GetIssuedBookById(int id)
    {
        var issuedBook = _registrationContext.IssuedBooks.FirstOrDefault(ib => ib.Issue_Id == id);
        if (issuedBook == null)
        {
            return NotFound("Issued book record not found.");
        }
        return Ok(issuedBook);
    }

    [HttpPost("IssueBook")]
    public IActionResult IssueBook([FromBody] IssuedBooks issued_Books)
    {
        var book = _registrationContext.Books.FirstOrDefault(b => b.BooksId == issued_Books.BooksId);
        var member = _registrationContext.Member.FirstOrDefault(m => m.UserId == issued_Books.UserId);
        

        if (book == null)
        {
            return NotFound("Book not found.");
        }

        if (member == null)
        {
            return NotFound("Member not found.");
        }

        issued_Books.Issued_Book_Name = book.Book_Name;
        issued_Books.Member_Type = member.Member_Type;
        issued_Books.Member_Name = member.Name;

        if (issued_Books.Member_Type == "Standard")
        {
            issued_Books.Return_Date = issued_Books.Issue_Date.AddDays(15);
        }
        else if (issued_Books.Member_Type == "Premium")
        {
            issued_Books.Return_Date = issued_Books.Issue_Date.AddDays(21);
        }
        else
        {
            return BadRequest("Invalid member type.");
        }

        issued_Books.Issue_Date = DateTime.Now.Date;

        _registrationContext.IssuedBooks.Add(issued_Books);
        _registrationContext.SaveChanges();

        return Ok("Book issued successfully.");
    }

    [HttpDelete]
    public IActionResult DeleteIssuedBook(int id)
    {
        var issuedBook = _registrationContext.IssuedBooks.FirstOrDefault(ib => ib.Issue_Id == id);
        if (issuedBook == null)
        {
            return NotFound("Issued book record not found.");
        }
        _registrationContext.IssuedBooks.Remove(issuedBook);
        _registrationContext.SaveChanges();
        return Ok("Issued book record deleted successfully.");
    }

    [HttpPut("{id}")]
    public IActionResult UpdateIssuedBook(int id, [FromBody] IssuedBooks updateIssuedBook)
    {
        var issuedBook = _registrationContext.IssuedBooks.FirstOrDefault(i => i.Issue_Id == id);

        if (issuedBook == null)
        {
            return NotFound("Issued book record not found.");
        }

        var member = _registrationContext.Member.Find(updateIssuedBook.UserId);
        if (member == null)
        {
            return BadRequest("Member not found. Cannot update issued book record with a non-existent member ID.");
        }

        var book = _registrationContext.Books.Find(updateIssuedBook.BooksId);
        if (book == null)
        {
            return BadRequest("Book not found. Cannot update issued book record with a non-existent book ID.");
        }

        issuedBook.Issued_Book_Name = updateIssuedBook.Issued_Book_Name;
        issuedBook.Return_Date = updateIssuedBook.Return_Date;
        issuedBook.Issue_Date = updateIssuedBook.Issue_Date;
        issuedBook.UserId = updateIssuedBook.UserId;
        issuedBook.BooksId = updateIssuedBook.BooksId;
        issuedBook.Member_Type = updateIssuedBook.Member_Type;
        issuedBook.Over_Due = updateIssuedBook.Over_Due;
        _registrationContext.IssuedBooks.Update(issuedBook);
        _registrationContext.SaveChanges();

        return Ok(issuedBook + "Issued book record updated successfully.");
    }

    [HttpPost("ReturnBook/{id}")]
    public IActionResult ReturnBook(int id)
    {
        var issuedBook = _registrationContext.IssuedBooks.FirstOrDefault(ib => ib.Issue_Id == id);
        if (issuedBook == null)
        {
            return NotFound("Issued book record not found.");
        }

        _registrationContext.IssuedBooks.Remove(issuedBook);
        _registrationContext.SaveChanges();
        return Ok("Book returned successfully.");
    }

    [HttpPost("ReissueBook/{id}")]
    public IActionResult ReissueBook(int id)
    {
        var issuedBook = _registrationContext.IssuedBooks.FirstOrDefault(ib => ib.Issue_Id == id);
        if (issuedBook == null)
        {
            return NotFound("Issued book record not found.");
        }

        // You'll need to fetch the member type again to calculate the new return date
        var member = _registrationContext.Member.FirstOrDefault(m => m.UserId == issuedBook.UserId);
        if (member == null)
        {
            return BadRequest("Member not found. Cannot reissue book.");
        }

        // Calculate new return date based on member type
        if (member.Member_Type == "Standard")
        {
            issuedBook.Return_Date = DateTime.Now.Date.AddDays(15);
        }
        else if (member.Member_Type == "Premium")
        {
            issuedBook.Return_Date = DateTime.Now.Date.AddDays(21);
        }
        else
        {
            return BadRequest("Invalid member type.");
        }

        // Set new issue date and reset over_Due
        issuedBook.Issue_Date = DateTime.Now.Date;
        issuedBook.Over_Due = "0";

        _registrationContext.IssuedBooks.Update(issuedBook);
        _registrationContext.SaveChanges();
        return Ok("Book reissued successfully.");
    }
    [HttpGet("SearchIssuedBook")]

    public IActionResult SearchIssuedBook ([FromQuery] string query)
        {
            var books = _registrationContext.IssuedBooks
                .Where(b => b.Issued_Book_Name.Contains(query) || b.Member_Name.Contains(query))
                .ToList();
            return Ok(books);
}


}