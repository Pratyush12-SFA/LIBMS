using LibraryManagementSystem.Data;
using LibraryMangaementSystem.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LibraryMangaementSystem.Controllers;

[Route("api/Issued_Books")]
[ApiController]
public class Issued_BooksController(RegistrationContext context) : ControllerBase
{
    private readonly RegistrationContext _registrationContext = context;

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
        var book = _registrationContext.Books.FirstOrDefault(b => b.BookId == issued_Books.BooksId);
        var member = _registrationContext.Member.FirstOrDefault(m => m.UserId == issued_Books.UserId);
            
        
        
        DateOnly today = DateOnly.FromDateTime(DateTime.Now);
        issued_Books.Issue_Date = today;


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

        

        _registrationContext.IssuedBooks.Add(issued_Books);
        _registrationContext.SaveChanges();

        return Ok("Book issued successfully.");
    }

   

    [HttpPut("{id}")]
    public IActionResult UpdateIssuedBook(int id, [FromBody] IssuedBooks updateIssuedBook)
    {
        // 1. Find the existing IssuedBook record using the route 'id' (Issue_Id)
        var issuedBook = _registrationContext.IssuedBooks.FirstOrDefault(i => i.Issue_Id == id);

        if (issuedBook == null)
        {
            return NotFound("Issued book record not found.");
        }

        // 2. Validate the Member (assuming UserId is the foreign key for the Member)
        // The original code incorrectly used updateIssuedBook.Issue_Id to find the member.
        var member = _registrationContext.Member.Find(updateIssuedBook.UserId); // **CORRECTED LINE**
        if (member == null)
        {
            return BadRequest("Member not found. Cannot update issued book record with a non-existent member ID.");
        }

        // 3. Validate the Book using BooksId
        var book = _registrationContext.Books.Find(updateIssuedBook.BooksId);
        if (book == null)
        {
            return BadRequest("Book not found. Cannot update issued book record with a non-existent book ID.");
        }

        // 4. Update properties (excluding the primary key Issue_Id)
        issuedBook.Issued_Book_Name = updateIssuedBook.Issued_Book_Name;
        issuedBook.Return_Date = updateIssuedBook.Return_Date;
        issuedBook.Issue_Date = updateIssuedBook.Issue_Date;
        issuedBook.UserId = updateIssuedBook.UserId; // This is the foreign key to Member
        issuedBook.BooksId = updateIssuedBook.BooksId;
        issuedBook.Member_Type = updateIssuedBook.Member_Type;
        issuedBook.Over_Due = updateIssuedBook.Over_Due;

        // 5. Save changes
        _registrationContext.IssuedBooks.Update(issuedBook);
        _registrationContext.SaveChanges();

        return Ok(issuedBook + " Issued book record updated successfully.");
    }
    [HttpPost("ReturnBook/{id}")]
    public IActionResult ReturnBook(int id)
    {
        // 1️⃣ Fetch the issued book record
        var issuedBook = _registrationContext.IssuedBooks
                            .FirstOrDefault(ib => ib.Issue_Id == id);

        if (issuedBook == null)
        {
            return NotFound("Issued book record not found.");
        }

        // 2️⃣ Instead of deleting immediately, mark the Return_Date
        // This ensures your AFTER UPDATE trigger can mark the book as Available
        issuedBook.Return_Date = DateOnly.FromDateTime(DateTime.Now);

        // 3️⃣ Update the issued book instead of removing it
        _registrationContext.IssuedBooks.Update(issuedBook);
        _registrationContext.SaveChanges();

        return Ok("Book returned successfully.");
    }


    [HttpPut("ReissueBook/{id}")]
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

        DateOnly today = DateOnly.FromDateTime(DateTime.Now);
        issuedBook.Issue_Date = today;

        // Calculate new return date based on member type
        if (member.Member_Type == "Standard")
        {
            issuedBook.Return_Date = DateOnly.FromDateTime(DateTime.Now).AddDays(15);
        }
        else if (member.Member_Type == "Premium")
        {
            issuedBook.Return_Date = DateOnly.FromDateTime(DateTime.Now).AddDays(21);
        }
        else
        {
            return BadRequest("Invalid member type.");
        }

        // Set new issue date and reset over_Due
   
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