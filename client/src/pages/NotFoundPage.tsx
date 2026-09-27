import { ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/ui/button';
import { notFound } from '@/assets';

const NotFoundPage = () => {
  return (
    <main className="relative flex h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div className="z-10 flex w-full max-w-lg flex-col items-center text-center">
        <div className="flex h-[50%] items-center justify-center">
          <img src={notFound} alt="Page not found" className="h-full w-full object-contain" />
        </div>

        <h1 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">Page not found</h1>

        <p className="mt-3 max-w-sm text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
          Looks like you've taken a wrong turn. The page you're looking for doesn't exist or may
          have been moved.
        </p>

        <div className="mt-3 flex flex-col items-center gap-2.5 sm:flex-row">
          <Button size="sm" className="h-9 px-4 text-xs">
            <Link to="/" className="flex items-center">
              <Home className="mr-1.5 size-3.5" />
              Back to Home
            </Link>
          </Button>

          <Button variant="outline" size="sm" className="h-9 px-4 text-xs">
            <Link to="/" className="flex items-center">
              <ArrowLeft className="mr-1.5 size-3.5" />
              Go Back
            </Link>
          </Button>
        </div>

        <p className="mt-3 text-[11px] text-muted-foreground/50">
          If you believe this is an error, try refreshing the page.
        </p>
      </div>
    </main>
  );
};

export default NotFoundPage;
