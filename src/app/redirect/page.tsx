"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/tasks");
    }, 2000);
  }, [router]);

  return <span>Redirecting in 2 seconds...</span>;
}
