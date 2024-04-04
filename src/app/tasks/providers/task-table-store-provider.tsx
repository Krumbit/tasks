"use client";

import { TaskTableStore, createTaskTableStore } from "@/state/taskTableStore";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

export const TaskTableStoreContext = createContext<StoreApi<TaskTableStore> | null>(null);

export interface TaskTableStoreProviderProps {
  children: ReactNode;
}

export const TaskTableStoreProvider = ({ children }: TaskTableStoreProviderProps) => {
  const storeRef = useRef<StoreApi<TaskTableStore>>();
  if (!storeRef.current) {
    storeRef.current = createTaskTableStore();
  }

  return (
    <TaskTableStoreContext.Provider value={storeRef.current}>
      {children}
    </TaskTableStoreContext.Provider>
  );
};

export const useTaskTableStore = <T,>(selector: (store: TaskTableStore) => T): T => {
  const taskTableStoreContext = useContext(TaskTableStoreContext);

  if (!taskTableStoreContext) {
    throw new Error(`useTaskTableStore must be use within TaskTableStoreProvider`);
  }

  return useStore(taskTableStoreContext, selector);
};
