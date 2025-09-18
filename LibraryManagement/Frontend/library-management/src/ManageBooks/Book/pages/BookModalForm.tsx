import { useState, useEffect } from "react";
import Card from "../../../shared/component/common/card";
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

interface BookModalFormProps {
  book: Book | null;
  onSuccess: () => void;
  onClose: () => void;
}

const API_URL = "https://localhost:7260/api/Books";

export default function BookModalForm({
  book,
  onSuccess,
  onClose,
}: BookModalFormProps) {
  const isEditing = !!book;
  const [formData, setFormData] = useState<Omit<Book, "booksId">>({
    book_Name: "",
    author: "",
    publisher: "",
    category: "",
    edition: "",
    isbn: "",
    published_Date: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing && book) {
      setFormData({
        ...book,
        published_Date: book.published_Date.split("T")[0], // Format date for input field
      });
    } else {
      setFormData({
        book_Name: "",
        author: "",
        publisher: "",
        category: "",
        edition: "",
        isbn: "",
        published_Date: "",
      });
    }
  }, [book, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const method = isEditing ? "PUT" : "POST";
    const endpoint = isEditing
      ? `${API_URL}/UpdateBook/${book?.booksId}`
      : `${API_URL}/AddBook`;

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          isEditing ? { ...formData, booksId: book?.booksId } : formData
        ),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      onSuccess();
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Failed to submit book data:", e);
    }
  };

  return (
    <Card title="BookList">
      <div className="modal">
        <div className="modal-content">
          <h2>{isEditing ? "Edit Book" : "Add New Book"}</h2>
          {error && <div className="error-message">Error: {error}</div>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="book_Name"
              placeholder="Book Name"
              value={formData.book_Name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="publisher"
              placeholder="Publisher"
              value={formData.publisher}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="edition"
              placeholder="Edition"
              value={formData.edition}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="isbn"
              placeholder="ISBN"
              value={formData.isbn}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="published_Date"
              placeholder="Published Date"
              value={formData.published_Date}
              onChange={handleChange}
              required
            />
            <div className="modal-buttons">
              <button type="submit">
                {isEditing ? "Update Book" : "Add Book"}
              </button>
              <button type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Card>
  );
}
