import { Bell, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NotificationMenuItemProps {
  unreadCount?: number;
}

const NotificationMenuItem = ({ unreadCount = 0 }: NotificationMenuItemProps) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate('/notifications')}
      className="group flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-muted/60"
    >
      <Bell className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />

      <span className="flex-1 text-sm">Notifications</span>

      {unreadCount > 0 && (
        <span className="min-w-5 rounded-full bg-foreground px-1.5 py-0.5 text-center text-[10px] font-medium text-background">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}

      <ChevronRight className="size-4 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
};

export default NotificationMenuItem;
