"use server";
import { NewTaskForm } from "@/types";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { todos, users } from "./schema";
import { auth } from "@clerk/nextjs";

export const getTodos = async ({ userId }: { userId: string }) => {
  return await db.select().from(todos).where(eq(todos.userId, userId));
};

export const getTodosForCurrentUser = async () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error(
      "An error occured while trying to fetch todos for current user. Please try again in a moment.",
    );
  }

  return await getTodos({ userId });
};

export const checkWhitelisted = async ({ userId }: { userId: string }) => {
  const user = await db.select().from(users).where(eq(users.id, userId));
  if (!user) throw new Error("No user found")

  return user[0].whitelisted;
};

export const addNewTodo = async ({ todo }: { todo: NewTaskForm }) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error(
      "An error occured while trying to fetch current user. Please try again in a moment.",
    );
  }

  return await db
    .insert(todos)
    .values({ userId, task: todo.task, type: todo.type, isCompleted: false })
    .returning();
};

export const deleteTodo = async ({ todoId }: { todoId: number }) => {
  await db.delete(todos).where(eq(todos.id, todoId));
};

export const setTodoCompletedState = async ({
  todoId,
  state,
}: {
  todoId: number;
  state: boolean;
}) => {
  await db.update(todos).set({ isCompleted: state, updatedAt: new Date().toString() }).where(eq(todos.id, todoId));
};

export const setTodoType = async ({
  todoId,
  type,
}: {
  todoId: number;
  type: (typeof todos.type.enumValues)[number];
}) => {
  await db.update(todos).set({ type, updatedAt: new Date().toString() }).where(eq(todos.id, todoId));
};

export const setTodoTask = async ({ todoId, task }: { todoId: number; task: string }) => {
  await db.update(todos).set({ task, updatedAt: new Date().toString() }).where(eq(todos.id, todoId));
};
