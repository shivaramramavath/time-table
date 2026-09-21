import LoginForm from '@/features/auth/components/LoginForm';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <Card className="w-full bg-muted/30">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome Back</CardTitle>

        <p className="text-sm text-muted-foreground">Continue your journey and keep building.</p>
      </CardHeader>

      <CardContent>
        <LoginForm />
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <div className="text-center text-sm text-muted-foreground">
          <span>Don't have an account? </span>

          <Link
            to="/register"
            className="font-medium text-primary transition hover:text-primary/80 hover:underline"
          >
            Create one
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
