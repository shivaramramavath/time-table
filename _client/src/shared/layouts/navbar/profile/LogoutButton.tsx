import { LogOut } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { authService } from '@/features/auth/services/auth.service';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="group w-full justify-start gap-3 rounded-lg px-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
    >
      <LogOut className="size-4" />

      <span className="flex-1 text-left text-sm">Log out</span>

      <span className="text-xs opacity-50 transition-opacity group-hover:opacity-100">→</span>
    </Button>
  );
};

export default LogoutButton;
