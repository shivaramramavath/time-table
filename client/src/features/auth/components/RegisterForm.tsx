import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from '@/shared/ui/field';

import { authService } from '@/features/auth/services/auth.service';
import GoogleRegisterBtn from './GoogleRegisterBtn';

type RegisterFormData = {
  userName: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      await authService.register(data);
      navigate('/timetables');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">User Name</FieldLabel>
            <Input
              id="userName"
              placeholder="bob"
              {...register('userName', {
                required: 'User Name is required',
                minLength: {
                  value: 3,
                  message: 'User Name must be at least 3 characters',
                },
              })}
            />
            {errors.userName && <FieldError>{errors.userName.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              placeholder="abc@example.com"
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

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              type="password"
              id="password"
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
      <Button type="submit" className="w-full mt-5" disabled={isSubmitting}>
        {isSubmitting ? 'Registering...' : 'Register'}
      </Button>

      <FieldSeparator className="my-4 col-span-full bg-transparent">OR</FieldSeparator>

      <GoogleRegisterBtn />
    </form>
  );
};

export default RegisterForm;
