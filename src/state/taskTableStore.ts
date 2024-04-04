import { Selection, SortDescriptor } from "@nextui-org/react";
import { createStore } from "zustand/vanilla";

const INITIAL_VISIBLE_COLUMNS = ["isCompleted", "task", "status", "type", "actions"];

type TaskTableState = {
  filterValue: string;
  visibleColumns: Selection;
  statusFilter: Selection;
  rowsPerPage: number;
  sortDescriptor: SortDescriptor;
  page: number;
};

type TaskTableActions = {
  setFilterValue: (value: string) => void;
  setVisibleColumns: (columns: Selection) => void;
  setStatusFilter: (filter: Selection) => void;
  setRowsPerPage: (rows: number) => void;
  setSortDescriptor: (descriptor: SortDescriptor) => void;
  setPage: (page: number) => void;
};

export type TaskTableStore = TaskTableState & TaskTableActions;
const defaultInitState: TaskTableState = {
  filterValue: "",
  visibleColumns: new Set(INITIAL_VISIBLE_COLUMNS),
  statusFilter: "all",
  rowsPerPage: 10,
  sortDescriptor: { column: "id", direction: "descending" },
  page: 1,
};

export const createTaskTableStore = (initState: TaskTableState = defaultInitState) => {
  return createStore<TaskTableStore>()((set) => ({
    ...initState,
    setFilterValue: (value: string) => set(() => ({ filterValue: value })),
    setVisibleColumns: (columns: Selection) => set(() => ({ visibleColumns: columns })),
    setStatusFilter: (filter: Selection) => set(() => ({ statusFilter: filter })),
    setRowsPerPage: (rows: number) => set(() => ({ rowsPerPage: rows })),
    setSortDescriptor: (descriptor: SortDescriptor) => set(() => ({ sortDescriptor: descriptor })),
    setPage: (page: number) => set(() => ({ page: page })),
  }));
};
