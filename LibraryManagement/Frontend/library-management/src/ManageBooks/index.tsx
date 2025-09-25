import { Route, Routes } from "react-router-dom";
import List from "./Book/pages/List";
// import BookModalForm from "./Book/pages/BookModalForm";
import IssuedList from "./IssuedBooks/pages/IssuedList";



export default function ManageBooks() {
    return (
        <Routes>
            <Route path="List" element={<List />} />
            
     
              <Route path="IssuedList" element={<IssuedList/>} />
             
          
           
        </Routes>
    )
}