import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";

export default function StyledSignUp() {
  return (
    <SignUpButton mode="modal" afterSignUpUrl="/redirect" afterSignInUrl="/tasks">
      <Button color="default">Sign Up</Button>
    </SignUpButton>
  );
}
