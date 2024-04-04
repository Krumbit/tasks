"use client";
import { ChevronDownIcon } from "@/components/ChevronDownIcon";
import { columns, typeConfig } from "@/data";
import { capitalize } from "@/utils";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Kbd,
  useDisclosure,
} from "@nextui-org/react";
import { ChangeEvent, useCallback } from "react";
import { HiSearch } from "react-icons/hi";
import { useTaskTableStore } from "../providers/task-table-store-provider";
import NewTaskModal from "./NewTaskModal";
import { Todo } from "@/types";

export default function TopTableContent({ todos }: { todos: Todo[] }) {
  const {
    setRowsPerPage,
    setPage,
    filterValue,
    setFilterValue,
    statusFilter,
    setStatusFilter,
    visibleColumns,
    setVisibleColumns,
  } = useTaskTableStore((state) => state);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [setPage, setRowsPerPage],
  );

  const onSearchChange = useCallback(
    (value?: string) => {
      if (value) {
        setFilterValue(value);
        setPage(1);
      } else {
        setFilterValue("");
      }
    },
    [setFilterValue, setPage],
  );

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, [setFilterValue, setPage]);

  const modalState = useDisclosure();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-3">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<HiSearch />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
          variant="faded"
          size="sm"
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                Type
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {typeConfig.map((type) => (
                <DropdownItem key={type.uid} className="capitalize">
                  {capitalize(type.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            onClick={modalState.onOpen}
            color="primary"
            endContent={
              <Kbd className="!bg-opacity-30" keys={"command"}>
                K
              </Kbd>
            }
          >
            Add New
          </Button>
          <NewTaskModal modalState={modalState} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-small text-default-400">Total {todos.length || 0} tasks</span>
        <label className="flex items-center text-small text-default-400">
          Rows per page:
          <select
            className="bg-transparent text-small text-default-400 outline-none"
            onChange={onRowsPerPageChange}
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
    </div>
  );
}
