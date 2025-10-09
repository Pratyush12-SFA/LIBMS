import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post } from "../../../shared/api";
    import  {put}  from "../../../shared/api"; 


const QUERY_KEY = ["issueed-book-list"];

export function useIssueBookListQuery() {
    return useQuery({
        queryKey: QUERY_KEY,
        queryFn: () => {
            return get<IssueBook.IssuedBookItem[]>("Issued_Books/GetIssuedBooks");
        },
    });
}

export function useIssueBookMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (issue_Id: number) => {
            return post(`Issued_Books/ReturnBook/${issue_Id}`, QUERY_KEY);
        },
        onSuccess: (_, issue_Id) => {
            const data = queryClient.getQueryData<IssueBook.IssuedBookItem[]>(QUERY_KEY);
            if(!data) {
                return;
            }

            const result = data.filter((s) => s.issue_Id !== issue_Id);

            queryClient.setQueryData(QUERY_KEY, result);
        },
    });
}

export function useReIssueBookMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (issue_Id: number) => {
            return put<string>(`Issued_Books/ReissueBook/${issue_Id}`, QUERY_KEY);
        },
        onSuccess: (_, issue_Id) => {
            const data = queryClient.getQueryData<IssueBook.IssuedBookItem[]>(QUERY_KEY);
            if(!data) {
                return;
            }
            
            const result = data.filter((s) => s.issue_Id !== issue_Id);

            queryClient.setQueryData(QUERY_KEY, result);
        },
    });
}