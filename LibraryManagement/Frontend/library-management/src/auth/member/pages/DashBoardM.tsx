import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 1. Define the Book interface for type safety
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
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Define API Base URL for cleaner code
  const API_BASE_URL = "https://localhost:7260/api/Books";

  // 2. Define the function to fetch ALL books (primary fetcher)
  const fetchAllBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/GetBooks`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: Book[] = await response.json();
      setBooks(data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred during initial load.");
      }
      console.error("Failed to fetch books:", e);
    } finally {
      setLoading(false);
    }
  };

  // 3. Define the search function. This is now accessible by the JSX.
  const handleSearch = async (query: string) => {
    // Show loading state while searching
    setLoading(true);
    setError(null);

    try {
      // If the query is empty, reload the entire book list using the reusable fetcher
      if (query.trim() === "") {
        await fetchAllBooks();
        return;
      }

      // Perform search
      const response = await fetch(
        `${API_BASE_URL}/SearchBooks?query=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }

      const data: Book[] = await response.json();
      setBooks(data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred during search.");
      }
      console.error("Failed to search for required book:", e);
      setBooks([]); // Clear the list on search error
    } finally {
      setLoading(false);
    }
  };

  // 4. useEffect is now clean, calling the primary fetcher on mount
  useEffect(() => {
    fetchAllBooks();
  }, []);

  // Utility function for date formatting
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="text-center p-8 text-xl font-semibold text-gray-700">
        Loading books...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-100 border border-red-400 text-red-700 rounded">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      {/* Header and Search Container */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-extrabold text-indigo-800 mb-4 md:mb-0">
          Library Book Catalog
        </h1>
        <div className="flex space-x-3">
          <button
            type="button"
            className="category-btn bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
            onClick={() => navigate("/ManageBooks/IssueBookForm")}
          >
            Issue Book
          </button>
          <button
            type="button"
            className="category-btn bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
            onClick={() => navigate("/ManageBooks/IssuedList")}
          >
            Manage Issued/Returns
          </button>
        </div>
      </div>

      {/* Search Bar linked to handleSearch */}
      <div className="search-container mb-6 flex space-x-3">
        <input
          type="text"
          placeholder="Search by Book Name, Author, or ISBN"
          className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSearch(searchQuery);
            }
          }}
        />
        <button
          onClick={() => handleSearch(searchQuery)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200"
        >
          Search
        </button>
      </div>

      {/* Book List Table */}
      <div className="bg-white p-4 rounded-xl shadow-2xl overflow-x-auto">
        {books.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-50">
              <tr>
                <TableHeader>ID</TableHeader>
                <TableHeader>Book Name</TableHeader>
                <TableHeader>Author</TableHeader>
                <TableHeader>Publisher</TableHeader>
                <TableHeader>Category</TableHeader>
                <TableHeader>Edition</TableHeader>
                <TableHeader>ISBN</TableHeader>
                <TableHeader>Published Date</TableHeader>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {books.map((book) => (
                <tr key={book.booksId} className="hover:bg-indigo-50 transition duration-150">
                  <TableData>{book.booksId}</TableData>
                  <TableData className="font-medium text-gray-900">
                    {book.book_Name}
                  </TableData>
                  <TableData>{book.author}</TableData>
                  <TableData>{book.publisher}</TableData>
                  <TableData>{book.category}</TableData>
                  <TableData>{book.edition}</TableData>
                  <TableData>{book.isbn}</TableData>
                  <TableData>{formatDate(book.published_Date)}</TableData>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center p-6 text-gray-500">
            No books found in the library matching the criteria.
          </p>
        )}
      </div>
    </div>
  );
}

// Simple helper components for cleaner JSX
const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <th
    scope="col"
    className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider"
  >
    {children}
  </th>
);

const TableData = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-600 ${className}`}>
    {children}
  </td>
);
