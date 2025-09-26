import { useForm } from "react-hook-form";
import { Card } from "../../../shared/component/common";

interface FormProps {
    onFormSubmit: (data: Book.Form) => void;
    buttonCaption: string;
    fetchData?: () => Promise<Book.Form>;
}

export default function Form(props: FormProps) {
    const {register, handleSubmit} = useForm<Book.Form>({
        defaultValues: props.fetchData,

    });

    return (
        <Card title="Book">
            <form onSubmit={handleSubmit(props.onFormSubmit)}>
                <input type="text" placeholder="BookName" {...register("book_Name")} />
                <input type="text" placeholder="Author" {...register("author")} />
                <input type="text" placeholder="Publisher" {...register("publisher")} />
                <input type="text" placeholder="Category" {...register("isbn")} />
                <input type="text" placeholder="Edition" {...register("edition")} />
                <input type="text" placeholder="Published-date" {...register("published_Date")} />
                <button type="submit">{props.buttonCaption}</button>
            </form>
        </Card>
    );
}


