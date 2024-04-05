import { setTodoCompletedState } from "@/lib/util";
import { Todo } from "@/types";
import { Button, Checkbox } from "@nextui-org/react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HiCheck } from "react-icons/hi";

export default function DoneButton({ todo }: { todo: Todo }) {
  const { id, isCompleted } = todo;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: setTodoCompletedState,
    onMutate: async (newTodos) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      if (previousTodos) {
        const i = previousTodos.findIndex((t) => t.id === newTodos.todoId);
        const newTodo = [...previousTodos];
        newTodo[i].isCompleted = newTodos.state;

        queryClient.setQueryData<Todo[]>(["todos"], newTodo);
      }

      return { previousTodos, newTodos };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
  const newTodos = mutation.context?.newTodos;
  const done = newTodos !== undefined ? newTodos.state : isCompleted;

  return (
    <Checkbox
      size="lg"
      color="success"
      defaultSelected={done}
      onValueChange={() => {
        toast.promise(() => mutation.mutateAsync({ todoId: id, state: !done }), {
          success: (data) => {
            return `Task #${data[0].localId} marked as ${newTodos?.state || done ? "incomplete" : "completed"}`;
          },
          error: "Something went wrong updating the task complete status",
        });
      }}
    />
  );
}
