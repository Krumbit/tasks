import { todos } from "@/lib/schema";
import { Todo } from "./types";

const whitelistEnabled = false;

const columns: ColumnConfig[] = [
  { name: "ID", uid: "id", sortable: true },
  { name: "DONE", uid: "isCompleted" },
  { name: "TASK", uid: "task" },
  { name: "STATUS", uid: "status" },
  { name: "TYPE", uid: "type" },
  { name: "CREATED AT", uid: "createdAt", sortable: true },
  { name: "UPDATED AT", uid: "updatedAt", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const typeConfig: TypeConfig[] = [
  { name: "Personal", uid: "personal" },
  { name: "Work", uid: "work" },
  { name: "School", uid: "school" },
  { name: "Misc", uid: "misc" },
];

type ColumnConfig = {
  name: string;
  uid: keyof typeof todos.$inferSelect | "status" | "actions";
  sortable?: boolean;
};

type TypeConfig = { name: string; uid: Todo["type"] };

export { whitelistEnabled, columns, typeConfig };
