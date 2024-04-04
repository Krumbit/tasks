import { SignInButton } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";

export default function StyledSignIn() {
  return (
    <SignInButton mode="modal" redirectUrl="/tasks">
      <Button color="default">Sign In</Button>
    </SignInButton>
  );
}
