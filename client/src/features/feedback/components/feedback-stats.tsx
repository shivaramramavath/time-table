import { CheckCircle2, Clock, MessageSquareText, Star } from "lucide-react";

import { Card, CardContent } from "@/shared/components/ui/card";
import type { Feedback } from "../types/feedback.types";

interface FeedbackStatsProps {
  feedbacks: Feedback[];
  total: number;
}

export default function FeedbackStats({
  feedbacks,
  total,
}: FeedbackStatsProps) {
  const pending = feedbacks.filter(
    (feedback) => feedback.status === "pending",
  ).length;

  const resolved = feedbacks.filter(
    (feedback) => feedback.status === "resolved",
  ).length;

  const averageRating =
    feedbacks.length > 0
      ? (
          feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) /
          feedbacks.length
        ).toFixed(1)
      : "—";

  const stats = [
    {
      label: "Total submissions",
      value: total,
      icon: MessageSquareText,
    },
    {
      label: "Average rating",
      value: averageRating,
      icon: Star,
    },
    {
      label: "Awaiting review",
      value: pending,
      icon: Clock,
    },
    {
      label: "Resolved",
      value: resolved,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <Card key={label}>
          <CardContent className="flex items-center justify-between gap-3 p-5">
            <div>
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="mt-2 text-2xl font-semibold">{value}</p>
            </div>

            <div className="rounded-lg bg-primary/10 p-3">
              <Icon className="size-5 text-primary" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
