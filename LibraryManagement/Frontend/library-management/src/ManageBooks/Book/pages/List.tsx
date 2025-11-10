import { Header } from "../../../shared/component/common";
import { Link, useNavigate } from "react-router-dom";
import { Datagrid } from "../../../shared/component/grid";
import "./list.css";
import { useBookListQuery, useBookMutation } from "./queries";

export default function List() {
  const { data = [] } = useBookListQuery();
  const { mutateAsync } = useBookMutation();
  const navigate = useNavigate();

  return (
    <div className="list-container">
      <Header title="Book List " />
      {/* FIX 1: Changed link destination and added className */}
      <Link to="/ManageBooks/Add" className="add-book-link">
        Add Book
      </Link>
      <Datagrid
        data={data}
        columns={[
          {
            field: "bookId",
            header: "BookId",
          },

          {
            field: "book_Name",
            header: "Book Name",
          },
          {
            field: "author",
            header: "Author",
          },
          {
            field: "category",
            header: "Category",
          },
          {
            field: "edition",
            header: "Edition",
          },
          {
            field: "isbn",
            header: "ISBN",
          },
          {
            field: "publisher",
            header: "Publisher",
          },
          {
            field: "published_Date",
            header: "Published-Date",
          },
          {
            buttonCaption: "Edit",
            onClick: (item) => {
              // FIX 2: Corrected navigation path to Edit route
              navigate(`/ManageBooks/Edit/${item.bookId}`);
            },
          },
          {
            buttonCaption: "Remove",
            onClick: async (item) => {
              const result = confirm(
                `Are you sure you want to remove ${item.book_Name}?`
              );
              if (!result) {
                return;
              }

              await mutateAsync(item.bookId);
            },
          },
        ]}
      />
    </div>
  );
}
