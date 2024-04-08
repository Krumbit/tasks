"use client";
import { columns, typeConfig } from "@/data";
import { useTodos } from "@/state/todos";
import { Todo } from "@/types";
import { SignedIn } from "@clerk/nextjs";
import {
  Pagination,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
} from "@nextui-org/react";
import { Key, useMemo, useState } from "react";
import { Toaster } from "sonner";
import DateButton from "./components/DateButton";
import DeleteTaskButton from "./components/DeleteTaskButton";
import DoneButton from "./components/DoneButton";
import EditTaskButton from "./components/EditTaskButton";
import TaskStateButton from "./components/TaskStateButton";
import TopTableContent from "./components/TopContent";
import TypeCell from "./components/TaskTypeButton";
import { useTaskTableStore } from "./providers/task-table-store-provider";

export default function TasksTableView() {
  const { data: todos } = useTodos();
  const {
    filterValue,
    visibleColumns,
    statusFilter,
    rowsPerPage,
    page,
    setPage,
    sortDescriptor,
    setSortDescriptor,
  } = useTaskTableStore((state) => state);
  const hasSearchFilter = Boolean(filterValue);
  const [showingCompleted, setShowingCompleted] = useState<boolean>(false);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  /**
   * Filters tasks based on the provided search filter and the selected task types
   * @returns The filtered todos
   */
  const filteredItems = useMemo(() => {
    let filteredTodos = todos.filter((td) => td.isCompleted === showingCompleted);

    if (hasSearchFilter) {
      filteredTodos = filteredTodos.filter((todo) =>
        todo.task.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== typeConfig.length) {
      filteredTodos = filteredTodos.filter((todo) => Array.from(statusFilter).includes(todo.type));
    }

    return filteredTodos;
  }, [todos, hasSearchFilter, statusFilter, showingCompleted, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  /**
   * Sorts items based on the `Number` representation of the selected sort descriptor
   * @returns The sorted items
   */
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const key = columns.find((c) => c.uid === sortDescriptor.column)?.uid as keyof Todo;
      const first = Number(a[key]);
      const second = Number(b[key]);

      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
  const renderCell = (todo: Todo, columnKey: Key) => {
    const { id } = todo;
    const cellValue = todo[columnKey as keyof Todo];

    switch (columnKey) {
      case "isCompleted":
        return <DoneButton todo={todo} />;
      case "createdAt":
      case "updatedAt":
        const date = new Date(cellValue as string);
        return <DateButton date={date} />;
      case "type":
        return <TypeCell todo={todo} />;
      case "status":
        return <TaskStateButton todo={todo} />;
      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            <EditTaskButton todoId={id} />
            <DeleteTaskButton todoId={id} />
          </div>
        );
      default:
        return cellValue.toString();
    }
  };

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center px-2 py-2">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages, setPage]);

  const tableView = () => {
    return (
      <Table
        aria-label="Your task table with cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-screen",
        }}
        className="lg:w-[60vw]"
        sortDescriptor={sortDescriptor}
        topContent={<TopTableContent todos={todos} />}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No tasks found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  };

  return (
    <SignedIn>
      <Toaster richColors duration={1750} />
      <Tabs
        aria-label="Archive"
        selectedKey={showingCompleted ? "completed" : "todo"}
        onSelectionChange={() => {
          setShowingCompleted(!showingCompleted);
          setPage(1);
        }}
      >
        <Tab key="todo" title="To-Do">
          {tableView()}
        </Tab>
        <Tab key="completed" title="Completed">
          {tableView()}
        </Tab>
      </Tabs>
    </SignedIn>
  );
}
