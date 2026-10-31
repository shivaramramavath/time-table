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

export const mockFeedbacks = [
  {
    _id: "feedback001",
    userId: "user001",
    message:
      "The timetable generator is excellent! It saves me so much time compared to creating schedules manually. I especially like the automatic arrangement of classes.",
    rating: 5,
    category: "general",
    status: "resolved",
    adminResponse:
      "Thank you for your feedback! We're glad the automatic timetable generation is helping you.",
    createdAt: "2026-10-20T10:30:00.000Z",
    updatedAt: "2026-10-21T08:00:00.000Z",
  },
  {
    _id: "feedback002",
    userId: "user001",
    message:
      "It would be great to have a dark mode toggle directly inside the timetable editor. Switching themes from settings takes a few extra steps.",
    rating: 4,
    category: "feature-request",
    status: "reviewed",
    adminResponse:
      "We've shared this suggestion with the product team for consideration.",
    createdAt: "2026-10-18T14:15:00.000Z",
    updatedAt: "2026-10-19T09:20:00.000Z",
  },
  {
    _id: "feedback003",
    userId: "user001",
    message:
      "When I drag a subject node across the timetable canvas, the page occasionally scrolls unexpectedly. This happens more often on smaller laptop screens.",
    rating: 3,
    category: "bug",
    status: "pending",
    createdAt: "2026-10-16T09:45:00.000Z",
    updatedAt: "2026-10-16T09:45:00.000Z",
  },
  {
    _id: "feedback004",
    userId: "user001",
    message:
      "The interface looks clean, but the faculty and classroom tables could use more spacing. Some columns feel cramped, especially when the faculty names are long.",
    rating: 4,
    category: "ui-ux",
    status: "pending",
    createdAt: "2026-10-14T12:00:00.000Z",
    updatedAt: "2026-10-14T12:00:00.000Z",
  },
  {
    _id: "feedback005",
    userId: "user001",
    message:
      "The dashboard takes several seconds to load when there are many timetable entries. Could we paginate the data or load it progressively?",
    rating: 2,
    category: "performance",
    status: "rejected",
    adminResponse:
      "We couldn't reproduce this issue in our tests. Please submit additional details if the problem continues.",
    createdAt: "2026-10-11T07:25:00.000Z",
    updatedAt: "2026-10-12T11:10:00.000Z",
  },
  {
    _id: "feedback006",
    userId: "user001",
    message:
      "Please add an option to export the generated timetable as a PDF. It would be useful for sharing schedules with faculty and students.",
    rating: 5,
    category: "feature-request",
    status: "pending",
    createdAt: "2026-10-08T16:40:00.000Z",
    updatedAt: "2026-10-08T16:40:00.000Z",
  },
];

export default function FeedbackHistory({
  page = 1,
  limit = 20,
}: FeedbackHistoryProps) {
  const { data } = useGetMyFeedback(page, limit);

  const feedbacks = mockFeedbacks;

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
