import { Form, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../shared/component/common";
import { getBook } from "../api";
import { put } from "../../../shared/api";

export default function Edit() {
    const { booksId } = useParams();
    const navigate = useNavigate();

    async function handleEditSubmit(data: Book.Form) {
        const response = await put(`Books/UpdateBooks/${booksId}`, data);

        if (response) {
            alert("Book saved Successfully");
            navigate("/ManageBooks/Book/List");
        }
    }
    return (
        
        <>
        <Header title="Edit book" />
        <Form 
        fetchData={() => getBook(booksId)}
        buttonCaption="Edit"
        onFormSubmit={handleEditSubmit}
        />
        
        </>
    );
}