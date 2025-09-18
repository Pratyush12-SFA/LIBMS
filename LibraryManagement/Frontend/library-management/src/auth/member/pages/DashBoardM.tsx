import { useState, useEffect } from "react";


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

export default function DashBoardM() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(
          "https://localhost:7260/api/Books/GetBooks"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Book[] = await response.json();
        setBooks(data);
      } catch (e: unknown) {
        // Use a type guard to safely handle the error object
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unexpected error occurred.");
        }
        console.error("Failed to fetch books:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

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
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books found in the library.</p>
      )}
    </div>
  );
}
