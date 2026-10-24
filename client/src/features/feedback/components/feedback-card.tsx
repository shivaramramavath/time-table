"use client";

import { CalendarDays, LoaderCircle, Star, Trash2 } from "lucide-react";
import { useState } from "react";
// import { toast } from "sonner";

import { useDeleteFeedback } from "../hooks/use-feedback";
import type { Feedback } from "../types/feedback.types";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";

interface FeedbackCardProps {
  feedback: Feedback;
}

const statusStyles: Record<Feedback["status"], string> = {
  pending: "border-yellow-500/30 bg-yellow-500/10 text-yellow-600",
  reviewed: "border-blue-500/30 bg-blue-500/10 text-blue-600",
  resolved: "border-green-500/30 bg-green-500/10 text-green-600",
  rejected: "border-destructive/30 bg-destructive/10 text-destructive",
};

export default function FeedbackCard({ feedback }: FeedbackCardProps) {
  const deleteFeedback = useDeleteFeedback();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    deleteFeedback.mutate(feedback._id, {
      onSuccess: () => {
        // toast.success("Feedback deleted successfully.");
        setConfirmDelete(false);
      },
      onError: () => {
        // toast.error("Unable to delete feedback.");
      },
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div className="min-w-0 space-y-2">
          <Badge variant="outline">
            {feedback.category.replaceAll("-", " ")}
          </Badge>

          <div className="flex flex-wrap items-center gap-1">
            {([1, 2, 3, 4, 5] as const).map((value) => (
              <Star
                key={value}
                className={`size-4 ${
                  value <= feedback.rating
                    ? "fill-primary text-primary"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
            <span className="ml-1 text-xs text-muted-foreground">
              {feedback.rating}/5
            </span>
          </div>
        </div>

        <Badge
          variant="outline"
          className={`shrink-0 capitalize ${statusStyles[feedback.status]}`}
        >
          {feedback.status}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="whitespace-pre-wrap break-words text-sm leading-6">
          {feedback.message}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarDays className="size-4" />
            {new Date(feedback.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>

          {feedback.status === "pending" && (
            <div className="flex flex-wrap items-center gap-2">
              {confirmDelete ? (
                <>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={deleteFeedback.isPending}
                  >
                    {deleteFeedback.isPending && (
                      <LoaderCircle className="mr-2 size-4 animate-spin" />
                    )}
                    Confirm delete
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setConfirmDelete(false)}
                    disabled={deleteFeedback.isPending}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setConfirmDelete(true)}
                  aria-label="Delete feedback"
                >
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </Button>
              )}
            </div>
          )}
        </div>

        {feedback.adminResponse && (
          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <p className="text-sm font-semibold">Response from the team</p>
            <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
              {feedback.adminResponse}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
