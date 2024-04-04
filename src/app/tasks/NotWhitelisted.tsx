import { Code } from "@nextui-org/react";

export default function NotWhitelisted() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h1 className="text-xl font-bold">You are not whitelisted!</h1>
      <span>
        Sorry, but you are not whitelisted to use this service. Please contact{" "}
        <Code className="text-gray-400">krumbit</Code> on Discord to gain access.
      </span>
    </div>
  );
}
