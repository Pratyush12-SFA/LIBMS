import { useState, useEffect } from "react";
import BookModalForm from "./BookModalForm";
import "./List&Modal.css";

interface Book {
  booksId: number;
  book_Name: string;
  author: string;
  publisher: string;
  category: string;
  edition: string;
  isbn: string;
  published_Date: string;
}

const API_URL = "https://localhost:7260/api/Books";

export default function List() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${API_URL}/GetBooks`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: Book[] = await response.json();
      setBooks(data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Failed to fetch books:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (bookId: number) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        const response = await fetch(`${API_URL}/DeleteBook/${bookId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setBooks(books.filter((book) => book.booksId !== bookId));
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unexpected error occurred during deletion.");
        }
      }
    }
  };

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedBook(null); // Clear selected book for add mode
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleSuccess = () => {
    handleModalClose();
    fetchBooks(); // Re-fetch the books to update the list
  };

  if (loading) {
    return <div>Loading books...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="book-list-container">
      <h1>Library Books</h1>
      <button onClick={handleAddClick}>Add New Book</button>

      {books.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Category</th>
              <th>Edition</th>
              <th>ISBN</th>
              <th>Published Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.booksId}>
                <td>{book.booksId}</td>
                <td>{book.book_Name}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.category}</td>
                <td>{book.edition}</td>
                <td>{book.isbn}</td>
                <td>{formatDate(book.published_Date)}</td>
                <td>
                  <button type="button" onClick={() => handleEdit(book)}>Edit</button>
                  <button onClick={() => handleDelete(book.booksId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books found in the library.</p>
      )}

      {isModalOpen && (
        <BookModalForm
          book={selectedBook}
          onSuccess={handleSuccess}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
