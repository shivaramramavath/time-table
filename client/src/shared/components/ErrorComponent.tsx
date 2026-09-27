import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorComponentProps {
  error: string;
  onRetry?: () => void;
}

const ErrorComponent = ({ error, onRetry }: ErrorComponentProps) => {
  return (
    <div className="flex h-full min-h-[300px] items-center justify-center rounded-xl border border-red-200 bg-red-50/50 px-6 py-8 dark:border-red-900/50 dark:bg-red-950/10">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
          <AlertTriangle className="h-7 w-7 text-red-600 dark:text-red-400" />
        </div>

        <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">
          Something went wrong
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          We couldn't complete your request. Please try again or come back later.
        </p>

        {error && (
          <div className="mt-4 w-full rounded-lg border border-red-200 bg-white px-4 py-3 text-left dark:border-red-900/50 dark:bg-background">
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Error details
            </p>

            <p className="break-words text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorComponent;
