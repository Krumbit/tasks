import { boolean, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const todoTypes = pgEnum("todo types", ["personal", "work", "school", "misc"]);

export const users = pgTable("users", {
  id: text("id").primaryKey().notNull(),
  whitelisted: boolean("whitelisted").default(false).notNull(),
});

export const todos = pgTable("todos", {
  id: serial("id").primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  userId: text("user_id")
    .default("")
    .notNull()
    .references(() => users.id, { onUpdate: "cascade" }),
  task: text("task").default("").notNull(),
  type: todoTypes("type").default("misc").notNull(),
  isCompleted: boolean("is_completed").default(false).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
});
