import { get } from "../../shared/api";

const EMPTY: Book.Form = {
    // booksId:  0,
  book_Name: "",
  author: "",
  publisher: "",
  category: "",
  edition: "",
  isbn:"",
  published_Date:"",
};

export async function getBook(bookId?: string) {
    if (!bookId) {
        return EMPTY;
    }
    const result = await get<Book.Form>(`Books/GetBookByID/${bookId}`);
    return result ?? EMPTY;
}