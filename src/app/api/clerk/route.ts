import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``;

async function validateRequest(request: Request) {
  const payloadString = await request.text();
  const headerPayload = headers();

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };
  const wh = new Webhook(webhookSecret);
  return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}

export async function POST(req: Request) {
  const { type, data } = await validateRequest(req);

  if (type === "user.created" && data.id) {
    await db.insert(users).values({ id: data.id, whitelisted: false });
    return new Response("Received", { status: 200 });
  } else {
    return new Response("Incorrect type or no user ID detected", { status: 406 });
  }
}
