// eslint-disable no-irregular-whitespace */
// import { useState, useEffect } from "react";
// import IssuedBookFormModal from "./IssuedBookFormModal";

// interface Issue {
//   issue_Id: number;
//   booksId: number;
//   issued_Book_Name: string;
//   userId: number;
//   member_Name: string;
//   member_Type: string;
//   issue_Date: string;
//   return_Date: string;
//   over_Due: number;
// }

// export default function IssuedList() {
//   const [issueList, setIssueList] = useState<Issue[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentIssue, setCurrentIssue] = useState<Issue | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   const API_BASE_URL = "https://localhost:7260/api/Issued_Books";

//   useEffect(() => {
//     fetchIssuedBooksList();
//   }, []);

//   const fetchIssuedBooksList = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/GetIssuedBooks`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data: Issue[] = await response.json();
//       setIssueList(data);
//     } catch (e: unknown) {
//       if (e instanceof Error) {
//         setError(e.message);
//       } else {
//         setError("An unexpected error occurred.");
//       }
//       console.error("Failed to fetch issued books:", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = async () => {
//     if (!searchQuery) {
//       fetchIssuedBooksList();
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/${searchQuery}`);
//       if (!response.ok) {
//         setIssueList([]);
//         throw new Error(`No issued book found with ID: ${searchQuery}`);
//       }
//       const data: Issue = await response.json();
//       setIssueList([data]);
//     } catch (e: unknown) {
//       if (e instanceof Error) {
//         setError(e.message);
//       }
//       console.error("Failed to search for issued book:", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReturn = async (issueId: number) => {
//     if (!window.confirm(`Are you sure you want to return this book?`)) {
//         return;
//     }
//     try {
//         const response = await fetch(`${API_BASE_URL}/ReturnBook/${issueId}`, {
//             method: 'POST',
//         });
//         if (!response.ok) {
//             const errorText = await response.text();
//             throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//         }
//         fetchIssuedBooksList();
//         alert('Book returned successfully!');
//     } catch (e: unknown) {
//         if (e instanceof Error) {
//             setError(e.message);
//         }
//         console.error("Failed to return book:", e);
//         alert(`Error: Failed to return book. ${e instanceof Error ? e.message : ''}`);
//     }
//   };

//   const handleReissue = async (issueId: number) => {
//     if (!window.confirm(`Are you sure you want to reissue this book? This will reset the due date.`)) {
//         return;
//     }
//     try {
//         const response = await fetch(`${API_BASE_URL}/ReissueBook/${issueId}`, {
//             method: 'POST',
//         });
//         if (!response.ok) {
//             const errorText = await await response.text();
//             throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//         }
//         fetchIssuedBooksList();
//         alert('Book reissued successfully!');
//     } catch (e: unknown) {
//         if (e instanceof Error) {
//             setError(e.message);
//         }
//         console.error("Failed to reissue book:", e);
//         alert(`Error: Failed to reissue book. ${e instanceof Error ? e.message : ''}`);
//     }
//   };

//   const handleEdit = (issueId: number) => {
//     const issueToEdit = issueList.find(issue => issue.issue_Id === issueId);
//     if (issueToEdit) {
//       setCurrentIssue(issueToEdit);
//       setIsModalOpen(true);
//     }
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setCurrentIssue(null);
//   };

//   const handleSave = async (updatedIssue: Issue) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/${updatedIssue.issue_Id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedIssue),
//       });
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//       }
//       fetchIssuedBooksList();
//       handleCloseModal();
//       alert('Issued book updated successfully!');
//     } catch (e: unknown) {
//       if (e instanceof Error) {
//         setError(e.message);
//       }
//       console.error("Failed to update issued book:", e);
//       alert(`Error: Failed to update issued book. ${e instanceof Error ? e.message : ''}`);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   if (loading) {
//     return <div>Loading issued books list...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="book-list-container">
//       <h1>Issued Library Books</h1>
//       <div className="search-container">
//         <input
//           type="string"
//           placeholder="Search"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>
//       {issueList.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               <th>Issue ID</th>
//               <th>Book ID</th>
//               <th>Book Name</th>
//               <th>User ID</th>
//               <th>Member Name</th>
//               <th>Member Type</th>
//               <th>Issue Date</th>
//               <th>Return Date</th>
//               <th>Over Due</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {issueList.map((issue) => (
//               <tr key={issue.issue_Id}>
//                 <td>{issue.issue_Id}</td>
//                 <td>{issue.booksId}</td>
//                 <td>{issue.issued_Book_Name}</td>
//                 <td>{issue.userId}</td>
//                 <td>{issue.member_Name}</td>
//                 <td>{issue.member_Type}</td>
//                 <td>{formatDate(issue.issue_Date)}</td>
//                 <td>{formatDate(issue.return_Date)}</td>
//                 <td>{issue.over_Due}</td>
//                 <td>
//                   <button onClick={() => handleEdit(issue.issue_Id)}>Edit</button>
//                   <button onClick={() => handleReissue(issue.issue_Id)}>Reissue</button>
//                   <button onClick={() => handleReturn(issue.issue_Id)}>Return</button>

//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No books have been issued.</p>
//       )}
//       {isModalOpen && currentIssue && (
//         <IssuedBookFormModal
//           isOpen={isModalOpen}
//           onClose={handleCloseModal}
//           onSave={handleSave}
//           initialData={currentIssue}
//         />
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import IssuedBookFormModal from "./IssuedBookFormModal";

interface Issue {
  issue_Id: number;
  booksId: number;
  issued_Book_Name: string;
  userId: number;
  member_Name: string;
  member_Type: string;
  issue_Date: string;
  return_Date: string;
  over_Due: number;
}

export default function IssuedList() {
  const [issueList, setIssueList] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIssue, setCurrentIssue] = useState<Issue | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const API_BASE_URL = "https://localhost:7260/api/Issued_Books";

  useEffect(() => {
    fetchIssuedBooksList();
  }, []);

  // Fetches the full list of issued books
  const fetchIssuedBooksList = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/GetIssuedBooks`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: Issue[] = await response.json();
      setIssueList(data);
      setError(null);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Failed to fetch issued books:", e);
    } finally {
      setLoading(false);
    }
  };

  // Fetches books based on the search query using the provided API endpoint
  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      // If the query is empty, fetch the entire list
      if (query.trim() === "") {
        fetchIssuedBooksList();
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/SearchIssuedBook?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }
      const data: Issue[] = await response.json();
      setIssueList(data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred during search.");
      }
      console.error("Failed to search for issued book:", e);
      setIssueList([]); // Clear the list on search error
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (issueId: number) => {
    if (!window.confirm(`Are you sure you want to return this book?`)) {
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/ReturnBook/${issueId}`, {
        method: "POST",
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }
      handleSearch(searchQuery); // Re-run the search to refresh the list
      alert("Book returned successfully!");
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      }
      console.error("Failed to return book:", e);
      alert(
        `Error: Failed to return book. ${e instanceof Error ? e.message : ""}`
      );
    }
  };

  const handleReissue = async (issueId: number) => {
    if (
      !window.confirm(
        `Are you sure you want to reissue this book? This will reset the due date.`
      )
    ) {
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/ReissueBook/${issueId}`, {
        method: "POST",
      });
      if (!response.ok) {
        const errorText = await await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }
      handleSearch(searchQuery); // Re-run the search to refresh the list
      alert("Book reissued successfully!");
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      }
      console.error("Failed to reissue book:", e);
      alert(
        `Error: Failed to reissue book. ${e instanceof Error ? e.message : ""}`
      );
    }
  };

  const handleEdit = (issueId: number) => {
    const issueToEdit = issueList.find((issue) => issue.issue_Id === issueId);
    if (issueToEdit) {
      setCurrentIssue(issueToEdit);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentIssue(null);
    handleSearch(searchQuery); // Refresh the list after closing the modal
  };

  const handleSave = async (updatedIssue: Issue) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${updatedIssue.issue_Id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedIssue),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }
      handleSearch(searchQuery); // Refresh the list after saving
      handleCloseModal();
      alert("Issued book updated successfully!");
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      }
      console.error("Failed to update issued book:", e);
      alert(
        `Error: Failed to update issued book. ${
          e instanceof Error ? e.message : ""
        }`
      );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) {
    return <div>Loading issued books list...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="book-list-container">
      <h1>Issued Library Books</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Book Name or Member Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSearch(searchQuery);
            }
          }}
        />
        <button onClick={() => handleSearch(searchQuery)}>Search</button>
      </div>
      {issueList.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Issue ID</th>
              <th>Book ID</th>
              <th>Book Name</th>
              <th>User ID</th>
              <th>Member Name</th>
              <th>Member Type</th>
              <th>Issue Date</th>
              <th>Return Date</th>
              <th>Over Due (Days)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {issueList.map((issue) => (
              <tr key={issue.issue_Id}>
                <td>{issue.issue_Id}</td>
                <td>{issue.booksId}</td>
                <td>{issue.issued_Book_Name}</td>
                <td>{issue.userId}</td>
                <td>{issue.member_Name}</td>
                <td>{issue.member_Type}</td>
                <td>{formatDate(issue.issue_Date)}</td>
                <td>{formatDate(issue.return_Date)}</td>
                <td>{issue.over_Due}</td>
                <td>
                  <button onClick={() => handleEdit(issue.issue_Id)}>
                    Edit
                  </button>
                  <button onClick={() => handleReissue(issue.issue_Id)}>
                    Reissue
                  </button>
                  <button onClick={() => handleReturn(issue.issue_Id)}>
                    Return
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No issued books match your current search.</p>
      )}
      {isModalOpen && currentIssue && (
        <IssuedBookFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
          initialData={currentIssue}
        />
      )}
    </div>
  );
}
