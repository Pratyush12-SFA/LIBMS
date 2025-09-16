using LibraryManagementSystem.Data;
using LibraryManagementSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LibraryMangaementSystem.Controllers
{
    [Route("api/Books")]
    [ApiController]
    public sealed class BookController : ControllerBase
    {
        private readonly RegistrationContext _registrationContext;
        public BookController(RegistrationContext Context)
        {
            _registrationContext = Context;
        }
        [HttpPost("AddBook")]

        public IActionResult AddBook([FromBody] Books books)
        {
            var existingBook = _registrationContext.Books.FirstOrDefault(b => b.ISBN == books.ISBN);
            if (existingBook != null)
            {
                return Conflict("Book with the same ISBN already exists.");
            }
            _registrationContext.Books.Add(books);
            _registrationContext.SaveChanges();
            return Ok("Book added successfully.");
        }

        [HttpGet("GetBooks")]

        public IActionResult GetBooks()
        {
            var books = _registrationContext.Books.ToList();
            return Ok(books);
        }

        [HttpDelete("DeleteBook/{id}")]

        public IActionResult DeleteBook(int id)
        {
            var book = _registrationContext.Books.FirstOrDefault(b => b.BooksId == id);
            if (book == null)
            {
                return NotFound("Book not found.");
            }
            _registrationContext.Books.Remove(book);
            _registrationContext.SaveChanges();
            return Ok("Book deleted successfully.");
        }

        [HttpPut("UpdateBook/{id}")]

        public IActionResult UpdateBook(int id, [FromBody] Books updatedBook)
        {
            var book = _registrationContext.Books.FirstOrDefault(b => b.BooksId == id);
            if (book == null)
            {
                return NotFound("Book not found.");
            }
            // Update book properties
            book.Book_Name = updatedBook.Book_Name;
            book.Category = updatedBook.Category;
            book.Author = updatedBook.Author;
            book.Publisher = updatedBook.Publisher;
            book.Edition = updatedBook.Edition;
            book.ISBN = updatedBook.ISBN;
            book.Published_Date = updatedBook.Published_Date;
            _registrationContext.SaveChanges();
            return Ok("Book updated successfully.");
        }

        [HttpGet("SearchBooks")]

        public IActionResult SearchBooks([FromQuery] string query)
        {
            var books = _registrationContext.Books
                .Where(b => b.Book_Name.Contains(query) || b.Author.Contains(query) || b.Category.Contains(query))
                .ToList();
            return Ok(books);
        }

        [HttpGet("GetBookById/{id}")]

        public IActionResult GetBookById(int id)
        {
            var book = _registrationContext.Books.FirstOrDefault(b => b.BooksId == id);
            if (book == null)
            {
                return NotFound("Book not found.");
            }
            return Ok(book);
        }
    }
}


       
    

