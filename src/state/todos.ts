import { getTodosForCurrentUser } from "@/lib/util";
import { useQuery } from "@tanstack/react-query";

export function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => await getTodosForCurrentUser(),
    initialData: [],
  });
}
