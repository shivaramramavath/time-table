"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

interface FeedbackErrorProps {
  onRetry: () => void;
}

export default function FeedbackError({ onRetry }: FeedbackErrorProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
        <AlertCircle className="size-10 text-destructive" />

        <h3 className="font-semibold">Unable to load feedback</h3>

        <p className="max-w-sm text-sm text-muted-foreground">
          Something went wrong while loading your feedback. Check your
          connection and try again.
        </p>

        <Button variant="outline" onClick={onRetry}>
          <RefreshCw className="mr-2 size-4" />
          Try again
        </Button>
      </CardContent>
    </Card>
  );
}
