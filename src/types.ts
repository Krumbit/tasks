import { todos } from "@/lib/schema";
import { InferSelectModel } from "drizzle-orm";
import { SVGProps } from "react";
import { z } from "zod";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Todo = InferSelectModel<typeof todos>;

export const newTaskSchema = z.object({
  task: z
    .string()
    .min(1, "Task should be at least 1 character")
    .max(1000, "Task should be at most 1000 characters."),
  type: z.enum([...todos.type.enumValues]),
});

export const editTaskSchema = z.object({
  task: z.string().min(1, "Task should be at least 1 character"),
});

export type NewTaskForm = z.infer<typeof newTaskSchema>;
export type EditTaskForm = z.infer<typeof editTaskSchema>;
