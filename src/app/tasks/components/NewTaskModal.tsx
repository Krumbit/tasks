import { todoTypes } from "@/lib/schema";
import { addNewTodo } from "@/lib/util";
import { NewTaskForm, newTaskSchema } from "@/types";
import { capitalize } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  SelectedItems,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";
import { TypeChip, todoTypeMap } from "./TypeChip";

export default function NewTaskModal({
  modalState,
}: {
  modalState: ReturnType<typeof useDisclosure>;
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addNewTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTaskForm>({
    resolver: zodResolver(newTaskSchema),
  });

  const onSubmit: SubmitHandler<NewTaskForm> = async (data) => {
    toast.promise(() => mutation.mutateAsync({ todo: data }), {
      loading: "Adding task...",
      success: (d) => {
        modalState.onClose();
        return `Task #${d[0].id} successfully created.`;
      },
      error: "Something went wrong while adding the task",
    });
  };

  useHotkeys("mod+k", (e) => {
    e.preventDefault();
    modalState.onOpen();
  });
  return (
    <Modal
      backdrop="blur"
      isOpen={modalState.isOpen}
      onOpenChange={modalState.onOpenChange}
      placement="center"
      autoFocus
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">New Task</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                autoComplete="off"
                label="Task"
                placeholder="Enter a new task"
                variant="bordered"
                isInvalid={!!errors.task}
                errorMessage={errors.task?.message}
                required
                {...register("task", { required: true })}
              />
              <Select
                label="Type"
                placeholder="Select a type"
                variant="bordered"
                renderValue={(items: SelectedItems<typeof todoTypeMap>) => {
                  return items.map((item) => {
                    return (
                      <Link
                        color={todoTypeMap[item.textValue as keyof typeof todoTypeMap]}
                        size="sm"
                        key={item.key}
                      >
                        {capitalize(item.textValue || "")}
                      </Link>
                    );
                  });
                }}
                {...register("type")}
              >
                {todoTypes.enumValues.map((type) => (
                  <SelectItem key={type} value={type} textValue={type}>
                    <TypeChip type={type} />
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={onClose}>
                Close
              </Button>
              <Button color="success" variant="flat" type="submit" isLoading={mutation.isPending}>
                Add
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
