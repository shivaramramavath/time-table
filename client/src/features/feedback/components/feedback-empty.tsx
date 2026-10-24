import { MessageSquareText } from "lucide-react";

export default function FeedbackEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 py-12 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <MessageSquareText className="size-7 text-muted-foreground" />
      </div>

      <h3 className="font-semibold">No feedback yet</h3>

      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Your submitted feedback will appear here. Share your thoughts using the
        form above.
      </p>
    </div>
  );
}
