import { Route, Routes } from "react-router-dom";
import List from "./pages/List";

export default function ManageBooks() {
    return (
        <Routes>
            <Route path="List" element={<List/>} />
        </Routes>
    )
}