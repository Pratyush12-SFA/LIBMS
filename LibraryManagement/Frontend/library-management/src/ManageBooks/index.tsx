import { Route, Routes } from "react-router-dom";
import List from "./Book/pages/List";

import IssuedList from "./IssuedBooks/pages/IssuedList";
import Add from "./Book/pages/Add";
import Edit from "./Book/pages/Edit";
import IssueBookForm from "./IssuedBooks/pages/IssueBookForm";



export default function ManageBooks() {
  return (
    <Routes>
      <Route path="List" element={<List />} />
      <Route path="Add" element={<Add />} />
      <Route path="Edit/:bookId" element={<Edit />} />
      
            <Route path="IssuedList" element={<IssuedList />} />
            <Route path="IssueBookForm" element={ <IssueBookForm />} />
    </Routes>
  );
}
