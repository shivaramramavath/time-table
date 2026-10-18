"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useRouter } from "next/navigation";
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "../schemas/reset-password.schema";
import { authService } from "../services/auth.service";
import { APP_CONSTANTS } from "@/shared/constants/app.constants";

const ResetPasswordForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      console.log("ForgotPassword data:", data);
      await authService.resetPassword(data, "dsggfsghfhfggfhgf");

      router.replace(APP_CONSTANTS.ROUTES.SIGNIN);
    } catch (error) {
      console.error("ForgotPassword failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      {/* Email */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Password</Label>

        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "email-error" : undefined}
          className="h-11 bg-background"
          {...register("password")}
        />

        {errors.password && (
          <p id="email-error" className="text-sm text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 h-11 w-full font-semibold"
      >
        {isSubmitting ? "Changing..." : "Change Password"}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
