import StyledSignIn from "@/components/StyledSignIn";
import StyledSignUp from "@/components/StyledSignUp";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button, Link } from "@nextui-org/react";

export default function HomePage() {
  return (
    <>
      <SignedIn>
        <Button color="primary" as={Link} href="/tasks">
          Go to Tasks
        </Button>
      </SignedIn>
      <SignedOut>
        <div className="flex items-center justify-center gap-4">
          <StyledSignIn />
          <p>or</p>
          <StyledSignUp />
        </div>
      </SignedOut>
    </>
  );
}
