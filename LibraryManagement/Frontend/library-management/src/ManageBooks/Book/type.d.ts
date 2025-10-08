declare namespace Book {
    interface Form {
// booksId: number;
  book_Name: string;
  author: string;
  publisher: string;
  category: string;
  edition: string;
  isbn: string;
  published_Date: string;
    }

    interface BookItem {
        bookId: number;
  book_Name: string;
  author: string;
  publisher: string;
  category: string;
  edition: string;
  isbn: string;
  published_Date: string;
    }
}