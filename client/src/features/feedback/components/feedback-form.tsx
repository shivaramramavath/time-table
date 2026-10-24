"use client";

import { LoaderCircle, MessageSquareText, Star } from "lucide-react";
import { useState, type FormEvent } from "react";
// import { toast } from "sonner";

import { useCreateFeedback } from "../hooks/use-feedback";
import type {
  CreateFeedback,
  FeedbackCategory,
  FeedbackRating,
} from "../types/feedback.types";

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

  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<FeedbackRating>(5);
  const [category, setCategory] = useState<FeedbackCategory>("general");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (trimmedMessage.length < 3) {
      // toast.error("Feedback must contain at least 3 characters.");
      return;
    }

    if (trimmedMessage.length > 2000) {
      // toast.error("Feedback cannot exceed 2000 characters.");
      return;
    }

    const payload: CreateFeedback = {
      message: trimmedMessage,
      rating,
      category,
    };

    createFeedback.mutate(payload, {
      onSuccess: () => {
        // toast.success("Feedback submitted successfully.");
        setMessage("");
        setRating(5);
        setCategory("general");
      },
      onError: () => {
        // toast.error("Unable to submit feedback. Please try again.");
      },
    });
  };

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
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label>How would you rate your experience?</Label>

            <div className="flex items-center gap-2">
              {([1, 2, 3, 4, 5] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-label={`Rate ${value} out of 5`}
                  aria-pressed={rating === value}
                  onClick={() => setRating(value)}
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback-category">Category</Label>
            <select
              id="feedback-category"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as FeedbackCategory)
              }
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {categories.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback-message">Your feedback</Label>
            <Textarea
              id="feedback-message"
              placeholder="Tell us what is working well or what we can improve..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              maxLength={2000}
              rows={5}
              required
              aria-describedby="feedback-message-count"
            />
            <p
              id="feedback-message-count"
              className="text-right text-xs text-muted-foreground"
            >
              {message.length}/2000
            </p>
          </div>

          <Button
            type="submit"
            disabled={createFeedback.isPending}
            className="w-full"
          >
            {createFeedback.isPending ? (
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
