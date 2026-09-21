import ForgotPasswordForm from '@/features/auth/components/ForgotPasswordForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

const ForgotPasswordPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Welcome Back</CardTitle>

        <p className="text-sm text-muted-foreground">Continue your journey and keep building.</p>
      </CardHeader>

      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordPage;
