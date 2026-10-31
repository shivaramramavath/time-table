import FeedbackHistory from "@/features/feedback/components/feedback-history";

export default function FeedbackHistoryPage() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Previous feedback</h2>
      <FeedbackHistory />
    </section>
  );
}
