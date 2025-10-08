import {  useParams } from "react-router";
import { put } from "../../../shared/api";
import { Header } from "../../../shared/component/common";
import Form from "../Component/Form";
import { getBook } from "../api";

export default function Edit() {
  const { bookId } = useParams();
  // const navigate = useNavigate();

  async function handleEditSubmit(data: Book.Form) {
   const response = await put(`Books/UpdateBookDetails/${bookId}`, data)
    

    if (response) {
      alert("Book saved successfully");
      // FIX: Change the path to the correct Book List page
      // navigate("/ManageBooks/List");
    }
  }

  return (
    <>
      <Header title="Edit State" />
      <Form
        fetchData={() => getBook(bookId)}
        buttonCaption="Edit"
        onFormSubmit={handleEditSubmit}
      />
    </>
  );
}
