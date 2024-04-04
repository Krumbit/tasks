import { Todo } from "@/types";
import { capitalize } from "@/utils";
import { Chip, ChipProps } from "@nextui-org/react";

export const todoTypeMap = {
  misc: "success",
  school: "danger",
  work: "warning",
  personal: "primary",
} as const satisfies Record<Todo["type"], ChipProps["color"]>;

export function TypeChip({ type }: { type: Todo["type"] }) {
  return (
    <Chip color={todoTypeMap[type]} size="sm" variant="flat">
      {capitalize(type)}
    </Chip>
  );
}
