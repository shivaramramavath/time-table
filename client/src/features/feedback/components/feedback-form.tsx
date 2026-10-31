"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, MessageSquareText, Star } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useCreateFeedback } from "../hooks/use-feedback";
import {
  feedbackSchema,
  type FeedbackFormValues,
} from "../schemas/feedback.schema";
import type { FeedbackCategory } from "../types/feedback.types";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";

const categories: { label: string; value: FeedbackCategory }[] = [
  { label: "General", value: "general" },
  { label: "Bug report", value: "bug" },
  { label: "Feature request", value: "feature-request" },
  { label: "UI / UX", value: "ui-ux" },
  { label: "Performance", value: "performance" },
  { label: "Other", value: "other" },
];

export default function FeedbackForm() {
  const createFeedback = useCreateFeedback();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    mode: "onTouched",
    defaultValues: {
      message: "",
      rating: 5,
      category: "general",
    },
  });

  const message = watch("message");
  const rating = watch("rating");

  const onSubmit = async (values: FeedbackFormValues) => {
    setServerError(null);

    try {
      await createFeedback.mutateAsync({
        ...values,
        message: values.message.trim(),
      });

      reset({
        message: "",
        rating: 5,
        category: "general",
      });
    } catch {
      setServerError("Unable to submit feedback. Please try again.");
    }
  };

  const submitting = isSubmitting || createFeedback.isPending;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquareText className="size-5 text-primary" />
          Share your feedback
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          Help us improve your timetable experience.
        </p>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          {/* Rating */}
          <div className="space-y-2">
            <Label>How would you rate your experience?</Label>

            <div
              className="flex items-center gap-2"
              role="group"
              aria-label="Feedback rating"
            >
              {([1, 2, 3, 4, 5] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-label={`Rate ${value} out of 5`}
                  aria-pressed={rating === value}
                  onClick={() => {
                    setValue("rating", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                    clearErrors("rating");
                  }}
                  className="rounded-md p-1 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Star
                    className={`size-7 ${
                      value <= rating
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}

              <span className="text-sm text-muted-foreground">{rating}/5</span>
            </div>

            {errors.rating && (
              <p className="text-sm text-destructive" role="alert">
                {errors.rating.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="feedback-category">Category</Label>

            <select
              id="feedback-category"
              {...register("category")}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-invalid={!!errors.category}
              aria-describedby={
                errors.category ? "feedback-category-error" : undefined
              }
            >
              {categories.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            {errors.category && (
              <p
                id="feedback-category-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="feedback-message">Your feedback</Label>

            <Textarea
              id="feedback-message"
              placeholder="Tell us what is working well or what we can improve..."
              {...register("message")}
              maxLength={2000}
              rows={5}
              aria-invalid={!!errors.message}
              aria-describedby={
                errors.message
                  ? "feedback-message-error feedback-message-count"
                  : "feedback-message-count"
              }
            />

            <div className="flex items-start justify-between gap-3">
              {errors.message ? (
                <p
                  id="feedback-message-error"
                  className="text-sm text-destructive"
                  role="alert"
                >
                  {errors.message.message}
                </p>
              ) : (
                <span />
              )}

              <p
                id="feedback-message-count"
                className="shrink-0 text-right text-xs text-muted-foreground"
              >
                {message.length}/2000
              </p>
            </div>
          </div>

          {/* API error */}
          {serverError && (
            <p
              className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
              role="alert"
            >
              {serverError}
            </p>
          )}

          {/* Submit */}
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? (
              <>
                <LoaderCircle className="mr-2 size-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit feedback"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
