import { deleteTodo } from "@/lib/util";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { HiTrash } from "react-icons/hi";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function DeleteTaskButton({ todoId }: { todoId: number }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
  return (
    <Popover placement="bottom" showArrow>
      <PopoverTrigger>
        <Button isIconOnly size="sm" color="danger" variant="flat">
          <HiTrash />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col items-center justify-center gap-2 px-1 py-2">
          <div className="text-small font-bold">Are you sure?</div>
          <Button
            color="danger"
            startContent={<HiTrash />}
            size="sm"
            variant="flat"
            onPress={() => {
              toast.promise(mutation.mutateAsync({ todoId }), {
                success: async (data) => {
                  return `Task #${data[0].localId} deleted`;
                },
                error: "Something went wrong deleting the task",
              });
            }}
            isLoading={mutation.isPending}
          >
            Yes, delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
