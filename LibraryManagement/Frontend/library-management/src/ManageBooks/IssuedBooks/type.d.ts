declare namespace IssueBook {

    interface Form {
        booksId: number;
        userId: number;
        member_Type: string;
        issue_Date: string;
        return_Date: string;
        over_Due: string;
        member_Name: string;
        issued_Book_Name: string;
         
    }

    interface IssuedBookItem {
        issue_Id: number;
         booksId: number;
        userId: number;
        member_Type: string;
        issue_Date: string;
        return_Date: string;
        over_Due: string;
        member_Name: string;
        issued_Book_Name: string;

    }

    
        interface IssueBookForm {

            userId: number;
            booksId: number;

        }

    
}