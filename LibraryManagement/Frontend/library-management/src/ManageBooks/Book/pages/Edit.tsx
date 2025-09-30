import { useNavigate, useParams } from "react-router";
import { put } from "../../../shared/api";
import { Header } from "../../../shared/component/common";
import Form from "../Component/Form";
import { getBook } from "../api";

export default function Edit() {
  const { booksId } = useParams();
  const navigate = useNavigate();

  async function handleEditSubmit(data: Book.Form) {
    const response = await put(`Books/UpdateBook/${booksId}`, data);
    console.log(booksId);

    if (response) {
      alert("Book saved successfully");
      // FIX: Change the path to the correct Book List page
      navigate("/ManageBooks/List");
    }
  }

  return (
    <>
      <Header title="Edit State" />
      <Form
        fetchData={() => getBook(booksId)}
        buttonCaption="Edit"
        onFormSubmit={handleEditSubmit}
      />
    </>
  );
}
