import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui/button';
import googleLogo from '@/assets/google.png';

import { authService } from '@/features/auth/services/auth.service';

const GoogleRegisterBtn = () => {
  const navigate = useNavigate();

  const handleRegister = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        await authService.googleRegister({
          googleToken: tokenResponse.access_token,
        });

        navigate('/timetables');
      } catch (error) {
        console.error('Google registration failed:', error);
      }
    },

    onError: (error) => {
      console.error('Google registration failed:', error);
    },
  });

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => handleRegister()}
      className="flex w-full items-center justify-center gap-3 border border-gray-300 transition-all duration-200 hover:bg-gray-50 hover:shadow-sm"
    >
      <span>Continue with Google</span>
    </Button>
  );
};

export default GoogleRegisterBtn;
