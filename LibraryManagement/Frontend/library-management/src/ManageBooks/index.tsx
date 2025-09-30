import { Route, Routes } from "react-router-dom";
import List from "./Book/pages/List";

import IssuedList from "./IssuedBooks/pages/IssuedList";
import Add from "./Book/pages/Add";
import Edit from "./Book/pages/Edit";



export default function ManageBooks() {
  return (
    <Routes>
      <Route path="List" element={<List />} />
      <Route path="Add" element={<Add />} />
      <Route path="Edit/:booksId" element={<Edit />} />
      
            <Route path="IssuedList" element={<IssuedList />} />
    </Routes>
  );
}
