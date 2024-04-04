"use client";
import { SignedIn } from "@clerk/clerk-react";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="absolute left-0 top-0 flex w-full items-center justify-between p-4">
      <SignedIn>
        <h1 className="text-2xl font-bold">Tasks</h1>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </nav>
  );
}
