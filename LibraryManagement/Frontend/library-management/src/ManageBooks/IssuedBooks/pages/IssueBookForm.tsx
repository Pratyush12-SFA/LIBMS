import { useNavigate } from "react-router-dom";
import { post } from "../../../shared/api";
import { Header } from "../../../shared/component/common";
import IssueForm from "../Component/IssueForm";

export default function IsuueBookForm() {
    const navigate = useNavigate();

    async function handleIssueBookSubmit(data: IssueBook.IssueBookForm) {
        const response = await post ("Issued_Books/IssueBook", data);
        if (!response) {
            alert("Book issued successfully");
            navigate("/ManageBooks/IssuedList");
        }
    }

    return (
        <>
            <Header title="Issue Book Here!" />
            <IssueForm buttonCaption="Issue" onFormSubmit={handleIssueBookSubmit} />
        </>
    );



}



