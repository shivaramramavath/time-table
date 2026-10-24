"use client";

import { MessageSquareText } from "lucide-react";

import { useGetMyFeedback } from "../hooks/use-feedback";
import FeedbackCard from "./feedback-card";
import FeedbackEmpty from "./feedback-empty";
import FeedbackStats from "./feedback-stats";

interface FeedbackHistoryProps {
  page?: number;
  limit?: number;
}

export default function FeedbackHistory({
  page = 1,
  limit = 20,
}: FeedbackHistoryProps) {
  const { data } = useGetMyFeedback(page, limit);

  const feedbacks = data.data;

  return (
    <section className="space-y-6">
      <FeedbackStats feedbacks={feedbacks} total={data.total} />

      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2">
          <MessageSquareText className="size-5 text-primary" />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Previous feedback</h2>
          <p className="text-sm text-muted-foreground">
            Review your submissions and responses.
          </p>
        </div>
      </div>

      {feedbacks.length === 0 ? (
        <FeedbackEmpty />
      ) : (
        <div className="space-y-4">
          {feedbacks.map((feedback) => (
            <FeedbackCard key={feedback._id} feedback={feedback} />
          ))}
        </div>
      )}

      {data.totalPages > 1 && (
        <p className="text-center text-sm text-muted-foreground">
          Showing page {data.page} of {data.totalPages}
        </p>
      )}
    </section>
  );
}
