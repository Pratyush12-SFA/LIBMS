import {  useIssueBookListQuery,  useIssueBookMutation,  useReIssueBookMutation,} from "./queries";
import { Header } from "../../../shared/component/common";
import { Datagrid } from "../../../shared/component/grid";

export default function IssueList() {
  const { data = [], refetch } = useIssueBookListQuery(); // Destructure 'refetch' to refresh data after mutations
  const { mutateAsync: issueBookAsync } = useIssueBookMutation(); // This seems to be the mutation for *returning* the book (based on the original Return button logic)
  const { mutateAsync: reissueBookAsync } = useReIssueBookMutation();

  return (
    <div className="list-container">
      <Header title="Issue Books List" />
      <Datagrid
        data={data}
        columns={[
          {
            field: "issue_Id",
            header: "Issue_Id",
          },
          {
            field: "booksId",
            header: "BookId",
          },
          {
            field: "userId",
            header: "MemberId",
          },
          {
            field: "issued_Book_Name",
            header: "Book Name",
          },
          {
            field: "member_Name",
            header: "Member Name",
          },
          {
            field: "member_Type",
            header: "Member Type",
          },
          {
            field: "issue_Date",
            header: "IssueDate",
          },
          {
            field: "return_Date",
            header: "ReturnDate",
          },
          {
            field: "over_Due",
            header: "Over Due",
          },
          {
            buttonCaption: "Re-issue",
            onClick: async (item) => {
              const result = confirm(
                `Are you sure you want to re-issue ${item.issued_Book_Name}?`
              );
              if (!result) {
                return;
              }

              await reissueBookAsync(item.issue_Id);

              refetch();
            },
          },
          {
            buttonCaption: "Return",
            onClick: async (item) => {
              const result = confirm(
                `Are you sure you want to return ${item.issued_Book_Name}?`
              );
              if (!result) {
                return;
              }
              await issueBookAsync(item.issue_Id);
              refetch();
            },
          },
        ]}
      />
    </div>
  );
}
