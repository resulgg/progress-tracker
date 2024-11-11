"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import GoogleIcon from "../icons/googleIcon";
const SignupWithGoogle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const onSignupWithGoogle = async () => {
    setIsLoading(true);
    await signIn("google", { redirectTo: "/dashboard" });
  };
  return (
    <Button
      onClick={onSignupWithGoogle}
      disabled={isLoading}
      className="h-12 w-full text-lg"
      size={"lg"}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="animate-spin" />
          Loading...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <GoogleIcon />
          Signup with Google
        </span>
      )}
    </Button>
  );
};

export default SignupWithGoogle;
