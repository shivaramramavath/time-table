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
          <ThemeProvider>
            <GoogleProvider>
              <AuthProvider>
                <AppRouter />
              </AuthProvider>

              <Toaster position="top-right" richColors duration={2000} />
            </GoogleProvider>
          </ThemeProvider>
        </NavigationProvider>
      </BrowserRouter>
    </QueryProvider>
  );
};

export default App;
