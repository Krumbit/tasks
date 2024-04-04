import { setTodoTask } from "@/lib/util";
import { EditTaskForm, editTaskSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiPencilAlt } from "react-icons/hi";
import { toast } from "sonner";

export default function EditTaskButton({ todoId }: { todoId: number }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: setTodoTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
  const { isOpen, onOpenChange, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTaskForm>({
    resolver: zodResolver(editTaskSchema),
  });
  const onSubmit: SubmitHandler<EditTaskForm> = (data) => {
    toast.promise(() => mutation.mutateAsync({ todoId, task: data.task }), {
      success: async (_) => {
        onClose();
        return `Task #${todoId} updated to "${data.task}"`;
      },
      error: "Something went wrong updating the task",
    });
  };

  return (
    <Popover placement="bottom" showArrow isOpen={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger>
        <Button isIconOnly size="sm" color="warning" variant="flat">
          <HiPencilAlt />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-2 px-1 py-2"
        >
          <Input
            autoFocus
            autoComplete="off"
            label="Task"
            placeholder="Enter new task name"
            variant="bordered"
            size="sm"
            isInvalid={!!errors.task}
            errorMessage={errors.task?.message}
            required
            {...register("task", { required: true })}
          />
          <Button
            className="w-full"
            color="warning"
            variant="flat"
            size="sm"
            type="submit"
            isLoading={mutation.isPending}
          >
            Edit
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
