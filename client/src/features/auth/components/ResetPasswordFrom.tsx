import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/shared/ui/field';

import { authService } from '@/features/auth/services/auth.service';

interface ResetPasswordFormData {
  token: string;
  password: string;
}

type props = {
  token: string;
};

const ResetPasswordFrom = ({ token }: props) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>();

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    try {
      await authService.resetPassword({
        token,
        password: data.password,
      });
      navigate('/login');
    } catch (error) {
      console.error('ResetPassword failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          {/* Password */}
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">Password</FieldLabel>

              <Link
                to="/forgot-password"
                className="text-sm text-primary transition hover:underline"
              >
                Forgot Password
              </Link>
            </div>

            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />

            {errors.password && <FieldError>{errors.password.message}</FieldError>}
          </Field>
        </FieldGroup>
      </FieldSet>

      <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};

export default ResetPasswordFrom;
