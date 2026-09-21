import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/ui/button';

const NotFoundPage = () => {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <span className="text-8xl font-bold tracking-tight text-muted-foreground/20">404</span>

      <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>

      <p className="mt-2 max-w-md text-muted-foreground">
        The page you are looking for doesn't exist or may have been moved.
      </p>

      <Button className="mt-6">
        <Link to="/" className="flex items-center">
          <ArrowLeft className="mr-2 size-4" />
          Go Home
        </Link>
      </Button>
    </main>
  );
};

export default NotFoundPage;
