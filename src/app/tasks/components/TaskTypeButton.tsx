import { typeConfig } from "@/data";
import { setTodoType } from "@/lib/util";
import { Todo } from "@/types";
import { capitalize } from "@/utils";
import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { toast } from "sonner";
import { TypeChip, todoTypeMap } from "./TypeChip";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function TypeCell({ todo }: { todo: Todo }) {
  const { id, type } = todo;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: setTodoType,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button color={todoTypeMap[type]} variant="flat" size="sm" radius="full">
          {capitalize(type)}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Change task type dropdown"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        onAction={(key) => {
          const newType = key as keyof typeof todoTypeMap;
          toast.promise(() => mutation.mutateAsync({ todoId: id, type: newType }), {
            success: (data) => {
              return `Task #${data[0].localId} has been updated to type ${capitalize(newType)}`;
            },
            error: "Something went wrong updating the task type",
          });
        }}
      >
        {typeConfig.map((type) => {
          return (
            <DropdownItem key={type.uid} textValue={type.uid}>
              <TypeChip type={type.uid} />
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
