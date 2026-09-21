import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { useNavigate, useSearchParams } from 'react-router-dom';

import ResetPasswordForm from '@/features/auth/components/ResetPasswordFrom';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  if (!token || token === '') {
    navigate('/');
  }

  return (
    <Card className="w-full bg-muted/30">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome Back</CardTitle>

        <p className="text-sm text-muted-foreground">Continue your journey and keep building.</p>
      </CardHeader>

      <CardContent>
        <ResetPasswordForm token={token!} />
      </CardContent>
    </Card>
  );
};

export default ResetPasswordPage;
