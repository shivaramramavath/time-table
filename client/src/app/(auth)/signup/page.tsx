import Link from "next/link";

import SignupForm from "@/features/auth/components/SignupForm";
import { Separator } from "@base-ui/react";

const SignupPage = () => {
  return (
    <div className="w-full bg-transparent border-0">
      <div className="p-4">{<SignupForm />}</div>

      <Separator />

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?
        <Link
          href="/signin"
          className="font-medium text-primary underline-offset-4 transition-colors hover:text-primary-hover hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
