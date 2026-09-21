import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { navigationService } from '@/shared/services/navigation.service';

type props = {
  children: React.ReactNode;
};

const NavigationProvider = ({ children }: props) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigationService.setNavigate(navigate);
  }, [navigate]);

  return <>{children}</>;
};

export default NavigationProvider;
