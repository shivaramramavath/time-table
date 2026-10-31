import { feedbackApi } from "@/features/feedback/api/feedback.api";
import FeedbackStats from "@/features/feedback/components/feedback-stats";

export default async function FeedbackStatsPage() {
  const result = await feedbackApi.getMyFeedback(1, 100);

  return <FeedbackStats feedbacks={result.data} total={result.total} />;
}
