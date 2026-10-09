import { Loader2 } from 'lucide-react';

interface LoadingComponentProps {
  message?: string;
  description?: string;
}

const LoadingComponent = ({
  message = 'Loading...',
  description = 'Please wait while we fetch the data.',
}: LoadingComponentProps) => {
  return (
    <div className="flex h-full min-h-[300px] items-center justify-center rounded-xl border border-blue-200 bg-blue-50/50 px-6 py-8 dark:border-blue-900/50 dark:bg-blue-950/10">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/40">
          <Loader2 className="h-7 w-7 animate-spin text-blue-600 dark:text-blue-400" />
        </div>

        <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400">{message}</h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default LoadingComponent;
