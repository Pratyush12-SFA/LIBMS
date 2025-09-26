// import { useState, useEffect } from "react";
// import BookModalForm from "./BookModalForm";
// import "./List&Modal.css";


// interface Book {
//   booksId: number;
//   book_Name: string;
//   author: string;
//   publisher: string;
//   category: string;
//   edition: string;
//   isbn: string;
//   published_Date: string;
// }

// const API_URL = "https://localhost:7260/api/Books";

// export default function List() {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedBook, setSelectedBook] = useState<Book | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");



//   const fetchBooks = async () => {
//     try {
//       const response = await fetch(`${API_URL}/GetBooks`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data: Book[] = await response.json();
//       setBooks(data);
//     } catch (e: unknown) {
//       if (e instanceof Error) {
//         setError(e.message);
//       } else {
//         setError("An unexpected error occurred.");
//       }
//       console.error("Failed to fetch books:", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const handleSearch = async (query: string) => {
//     setLoading(true);
//     setError(null);
//     try{
//       if (query.trim() === "" ) {
//         fetchBooks();
//         return;
//       }

//       const response = await fetch(
//         `${API_URL}/SearchBooks?query=${encodeURIComponent(query)}`

//       );
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(
//           `Http error! Sattus: ${response.status}, Message: ${errorText}`
//         );

//       }
//       const data: Book[] = await response.json();
//       setBooks(data);
//     }
//     catch (e: unknown) {
//       if (e instanceof Error) {
//         setError(e.message);
//       } else {
//         setError("An unexpected error occurred during search. ");
//       }
//       console.error("Failed to search for book:", e);
//       setBooks([]);
//     }
//     finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (bookId: number) => {
//     if (window.confirm("Are you sure you want to delete this book?")) {
//       try {
//         const response = await fetch(`${API_URL}/DeleteBook/${bookId}`, {
//           method: "DELETE",
//         });
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         setBooks(books.filter((book) => book.booksId !== bookId));
//       } catch (e: unknown) {
//         if (e instanceof Error) {
//           setError(e.message);
//         } else {
//           setError("An unexpected error occurred during deletion.");
//         }
//       }
//     }
//   };

//   const handleEdit = (book: Book) => {
//     setSelectedBook(book);
//     setIsModalOpen(true);
//   };

//   const handleAddClick = () => {
//     setSelectedBook(null); // Clear selected book for add mode
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setSelectedBook(null);
//   };

//   const handleSuccess = () => {
//     handleModalClose();
//     fetchBooks(); // Re-fetch the books to update the list
//   };

//   if (loading) {
//     return <div>Loading books...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   return (
//     <div className="book-list-container">
//       <h1>Library Books</h1>
//       <button onClick={handleAddClick}>Add New Book</button>
//       <div className="search-container">
//         <input
//         type = "text"
//         placeholder="Search books here"
//         value={searchQuery}
//         onChange = {(e) => setSearchQuery(e.target.value)} 
//         onKeyUp = {(e) => {
//             if (e.key === "Enter") {
//               handleSearch(searchQuery);
//             }
//         }}
//         />
//          <button onClick={() => handleSearch(searchQuery)}>Search</button>

//       </div>

//       {books.length > 0 ? (
//         <table>
//           <thead>
//             <tr>  
//               <th>Book ID</th>
//               <th>Book Name</th>
//               <th>Author</th>
//               <th>Publisher</th>
//               <th>Category</th>
//               <th>Edition</th>
//               <th>ISBN</th>
//               <th>Published Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book) => (
//               <tr key={book.booksId}>
//                 <td>{book.booksId}</td>
//                 <td>{book.book_Name}</td>
//                 <td>{book.author}</td>
//                 <td>{book.publisher}</td>
//                 <td>{book.category}</td>
//                 <td>{book.edition}</td>
//                 <td>{book.isbn}</td>
//                 <td>{formatDate(book.published_Date)}</td>
//                 <td>
//                   <button type="button" onClick={() => handleEdit(book)}>Edit</button>
//                   <button onClick={() => handleDelete(book.booksId)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No books found in the library.</p>
//       )}

//       {isModalOpen && (
//         <BookModalForm
//           book={selectedBook}
//           onSuccess={handleSuccess}
//           onClose={handleModalClose}
//         />
//       )}
//     </div>
//   );
// }




import { Header } from "../../../shared/component/common";
import { Link, useNavigate } from "react-router-dom";
import { Datagrid } from "../../../shared/component/grid";
import "./list.css";
import { useBookListQuery, useBookMutation } from "./queries";


export default function List() {
  const { data = [] } = useBookListQuery();
  const { mutateAsync} = useBookMutation();
  const navigate = useNavigate();
  
  return (
    <>
    <Header title= "City List " />
    <Link to="/ManageBooks/Book/List">Add Book</Link>
    <Datagrid
    data={data}
    columns={[
      {
        field: "booksId",
        header: "BookId"
      },

      {
        field:"book_Name",
        header:"Book Name",
      },
      {
        field:"author",
        header:"Author",
      },
      {
        field:"category",
        header:"Category",
      },
      {
        field: "edition",
        header: "Edition",
      },
      {
        field:"isbn",
        header:"ISBN",
      },
      {
        field:"publisher",
        header:"Publisher",
      },
      {
        field:"published_Date",
        header:"Published-Date",
      },
      {
        buttonCaption: "Edit",
        onClick: (item) => {
          navigate("/auth/DashBoardM" + item.booksId)
        },
      },
      {
        buttonCaption: "Remove",
        onClick: async (item) => {
          const result = confirm (
            `Are you sure you want to remove ${item.book_Name}?`
          );
          if (!result) {
            return;
          }

          await mutateAsync(item.booksId);
        },
      },
    ]}
/>
    </>
  )




}