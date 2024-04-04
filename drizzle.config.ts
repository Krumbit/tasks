import { defineConfig } from "drizzle-kit";

export default defineConfig({
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
  verbose: true,
  strict: true,
  out: "./drizzle",
  schema: "./lib/schema.ts",
});
