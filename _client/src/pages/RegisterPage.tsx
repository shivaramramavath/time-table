import React from 'react';
import { Link } from 'react-router-dom';

import RegisterForm from '@/features/auth/components/RegisterForm';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';

const RegisterPage = () => {
  return (
    <Card className="w-full bg-muted/30">
      <CardHeader>
        <CardTitle className="text-2xl">Join Us</CardTitle>

        <p className="text-sm text-muted-foreground">
          Sign up to unlock powerful tools and seamless workflows.
        </p>
      </CardHeader>

      <CardContent>
        <RegisterForm />
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <div className="w-full text-center text-sm text-muted-foreground">
          <span>Already have an account? </span>

          <Link
            to="/login"
            className="font-medium text-primary transition hover:text-primary/80 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterPage;
