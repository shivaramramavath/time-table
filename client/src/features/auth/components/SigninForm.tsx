"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { signinSchema, type SigninFormValues } from "../schemas/signin.schema";
import { authService } from "../services/auth.service";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { APP_CONSTANTS } from "@/shared/constants/app.constants";

const SigninForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SigninFormValues) => {
    try {
      await authService.signin(data);

      const redirect = searchParams.get("redirect");

      // Only allow safe, internal paths.
      const destination =
        redirect?.startsWith("/") &&
        !redirect.startsWith("//") &&
        !redirect.startsWith("/\\")
          ? redirect
          : APP_CONSTANTS.ROUTES.DASHBOARD;

      router.replace(destination);
    } catch (error) {
      console.error("Signin failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email address</Label>

        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="h-11 bg-background"
          {...register("email")}
        />

        {errors.email && (
          <p id="email-error" className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Label htmlFor="password">Password</Label>

          <Link
            className="text-sm text-muted-foreground hover:text-foreground"
            href="/forgot-password"
          >
            Forgot password?
          </Link>
        </div>

        <Input
          id="password"
          type="password"
          placeholder="Enter password"
          autoComplete="current-password"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
          className="h-11 bg-background"
          {...register("password")}
        />

        {errors.password && (
          <p id="password-error" className="text-sm text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 h-11 w-full font-semibold"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
};

export default SigninForm;
