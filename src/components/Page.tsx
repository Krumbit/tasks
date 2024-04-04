import React from "react";
import Navbar from "./Navbar";

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Page({ children, className }: PageProps) {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-center ${className}`}>
      <Navbar />
      {children}
    </main>
  );
}
