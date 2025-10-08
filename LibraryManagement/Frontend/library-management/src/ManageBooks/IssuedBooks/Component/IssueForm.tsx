import { Card } from "../../../shared/component/common";
import { useForm } from "react-hook-form";

interface IssueFormProps {
    onFormSubmit: (data: IssueBook.IssueBookForm) => void;
    buttonCaption: string;
    fetchData?: () => Promise<IssueBook.IssueBookForm>;
}

export default function IssueForm( props: IssueFormProps) {
    const { register, handleSubmit } = useForm<IssueBook.IssueBookForm>({
        defaultValues: props.fetchData,
    });

    return(
        <Card title="IsuuedBook">
            <form onSubmit={handleSubmit(props.onFormSubmit)}>
            <input type="number" placeholder="UserId" {...register("userId")} />
            <input type="number" placeholder="BookId"{...register("booksId")} />
             <button type="submit">{props.buttonCaption}</button>
            </form>
        </Card>
    );
}

