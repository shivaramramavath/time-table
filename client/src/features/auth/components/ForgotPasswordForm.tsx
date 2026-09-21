import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/shared/ui/field';

import { authService } from '@/features/auth/services/auth.service';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    try {
      await authService.forgotPassword(data);
      navigate('/login');
    } catch (error) {
      console.error('ForgotPassword failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>

            <Input
              id="email"
              type="email"
              placeholder="abc@example.com"
              autoComplete="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />

            {errors.email && <FieldError>{errors.email.message}</FieldError>}
          </Field>
        </FieldGroup>
      </FieldSet>

      <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'ForgotPassword'}
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
