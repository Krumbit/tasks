import { Todo } from "@/types";
import { Button } from "@nextui-org/react";
import { HiCheck, HiX } from "react-icons/hi";

export default function TaskStateButton({ todo }: { todo: Todo }) {
  const { isCompleted } = todo;
  return (
    <Button
      startContent={isCompleted ? <HiCheck /> : <HiX />}
      color={isCompleted ? "success" : "danger"}
      variant="flat"
      className="flex justify-center"
      size="sm"
      radius="full"
    >
      {isCompleted ? "Done" : "Not Done"}
    </Button>
  );
}
