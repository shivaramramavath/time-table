import FeedbackSkeleton from "@/features/feedback/components/feedback-skeleton";

export default function Loading() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Previous feedback</h2>
      <FeedbackSkeleton />
    </section>
  );
}
