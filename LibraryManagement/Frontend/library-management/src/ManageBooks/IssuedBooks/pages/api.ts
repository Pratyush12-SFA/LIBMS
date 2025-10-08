import { get } from "../../../shared/api";


const EMPTY: IssueBook.Form = {
    booksId: 0,
        userId: 0,
        member_Type: "",
        issue_Date: "",
        return_Date: "",
        over_Due: "",
        member_Name: "",
        issued_Book_Name: "",
};

export async function getIssueBook(issue_Id?: string) {
    if(!issue_Id) {
        return EMPTY;
    }
    const result = await get<IssueBook.Form>(`Issued_Books/${issue_Id}`);
    return result ?? EMPTY;
}