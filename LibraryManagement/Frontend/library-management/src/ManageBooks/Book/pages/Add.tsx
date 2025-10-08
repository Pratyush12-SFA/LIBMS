import { useNavigate } from "react-router-dom";
import { Header } from "../../../shared/component/common";
import Form from "../Component/Form";
import { post } from "../../../shared/api";

export default function Add() {
    const navigate =useNavigate();


    async function handleBookSubmit(data: Book.Form) {
        const response = await post("Books/AddBook", data);
        if(!response) {
            alert("Book saved successfully");
            navigate("/ManageBooks/List");
        }
    }

    return (
        <>
        <Header title="New Book" />
        <Form buttonCaption="Add" onFormSubmit={handleBookSubmit} />
        </>
    );
}