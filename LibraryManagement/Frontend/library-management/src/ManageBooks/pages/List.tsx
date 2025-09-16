import { useEffect, useState } from "react";

type Book = {
  booksId: number;
  book_Name: string;
  author: string;
  category: string;
  publisher: string;
  edition: string;
  isbn: string;
  published_Date: string;
};

export default function List() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("https://localhost:7260/api/Books/GetBooks")
      .then((res) => res.json())
      .then((data) => {
        console.log("Books data", data);
        setBooks(data);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Books List</h2>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Author</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Publisher</th>
            <th className="border px-4 py-2">Edition</th>
            <th className="border px-4 py-2">ISBN</th>
            <th className="border px-4 py-2">Published Date</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.booksId}>
              <td className="border px-4 py-2">{book.book_Name}</td>
              <td className="border px-4 py-2">{book.author}</td>
              <td className="border px-4 py-2">{book.category}</td>
              <td className="border px-4 py-2">{book.publisher}</td>
              <td className="border px-4 py-2">{book.edition}</td>
              <td className="border px-4 py-2">{book.isbn}</td>
              <td className="border px-4 py-2">{book.published_Date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
