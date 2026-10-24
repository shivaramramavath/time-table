"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Component, type ErrorInfo, type ReactNode } from "react";

import { Button } from "@/shared/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class FeedbackErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Feedback page error:", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border p-10 text-center">
          <AlertCircle className="size-10 text-destructive" />

          <h2 className="font-semibold">Could not load feedback</h2>

          <p className="text-sm text-muted-foreground">
            Please try again. If the problem continues, check your connection
            and sign-in status.
          </p>

          <Button onClick={this.handleRetry} variant="outline">
            <RefreshCw className="mr-2 size-4" />
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
