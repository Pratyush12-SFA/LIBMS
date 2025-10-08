import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { del, get } from "../../../shared/api";

const QUERY_KEY = ["book-list"];

export function useBookListQuery() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => {
      return get<Book.BookItem[]>("Books/GetBooks");
    },
  });
}

export function useBookMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookId: number) => {
      return del(`Books/DeleteBook/${bookId}`);
    },
    onSuccess: (_, bookId) => {
      const data = queryClient.getQueryData<Book.BookItem[]>(QUERY_KEY);
      if (!data) {
        return;
      }

      const result = data.filter((s) => s.bookId !== bookId);

      queryClient.setQueryData(QUERY_KEY, result);
    },
  });
}
