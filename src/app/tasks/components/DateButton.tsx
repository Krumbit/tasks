import { capitalize } from "@/utils";
import { Button, Tooltip } from "@nextui-org/react";
import { formatRelative } from "date-fns";

export default function DateButton({ date }: { date: Date }) {
  return (
    <Tooltip showArrow content={date.toString()} closeDelay={10}>
      <Button>{capitalize(formatRelative(date, new Date()))}</Button>
    </Tooltip>
  );
}
