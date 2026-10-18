import Link from "next/link";

import SigninForm from "@/features/auth/components/SigninForm";
import { Separator } from "@base-ui/react";

const SigninPage = () => {
  return (
    <div className="w-full bg-transparent border-0">
      <div className="p-4">{<SigninForm />}</div>

      <Separator />

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?
        <Link
          href="/signin"
          className="font-medium text-primary underline-offset-4 transition-colors hover:text-primary-hover hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SigninPage;
