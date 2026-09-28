import { BrowserRouter } from 'react-router-dom';

import { Toaster } from '@/shared/ui/sonner';

import { QueryProvider } from './providers/QueryProvider';
import { GoogleProvider } from './providers/GoogleProvider';
import ThemeProvider from './providers/ThemeProvider';

import AppRouter from './router/AppRouter';
import AuthProvider from './providers/AuthProvider';
import NavigationProvider from './providers/NavigationProvider';

const App = () => {
  return (
    <QueryProvider>
      <BrowserRouter>
        <NavigationProvider>
          <GoogleProvider>
            <AuthProvider>
              <ThemeProvider>
                <AppRouter />
                <Toaster position="top-right" richColors duration={2000} />
              </ThemeProvider>
            </AuthProvider>
          </GoogleProvider>
        </NavigationProvider>
      </BrowserRouter>
    </QueryProvider>
  );
};

export default App;
