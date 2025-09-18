import { Route, Routes } from "react-router-dom";
import List from "./Book/pages/List";
import BookModalForm from "./Book/pages/BookModalFOrm";

export default function ManageBooks() {
    return (
        <Routes>
            <Route path="List" element={<List />} />
            <Route path="BookModalFOrm" element={<BookModalForm book={null} onSuccess={function (): void {
                throw new Error("Function not implemented.");
            } } onClose={function (): void {
                throw new Error("Function not implemented.");
            } }/>} />
        </Routes>
    )
}