import { checkWhitelisted, getTodosForCurrentUser } from "@/lib/util";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NotWhitelisted from "./NotWhitelisted";
import TasksTableView from "./TableView";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { whitelistEnabled } from "@/data";

export default async function TasksPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }
  const whitelisted = await checkWhitelisted({ userId: user.id });

  return whitelisted || !whitelistEnabled ? <Whitelisted /> : <NotWhitelisted />;
}

async function Whitelisted() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: getTodosForCurrentUser,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TasksTableView />
    </HydrationBoundary>
  );
}
