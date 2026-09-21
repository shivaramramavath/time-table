import { Button } from '@/shared/ui/button';
import type { LucideIcon } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  value?: string;
  badge?: number;
  onClick?: () => void;
}

const MenuItem = ({ icon: Icon, label, value, badge, onClick = () => {} }: MenuItemProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-muted/60"
    >
      <Icon className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />

      <span className="flex-1 text-sm">{label}</span>

      {badge !== undefined && (
        <span className="rounded-full bg-foreground px-2 py-0.5 text-[10px] font-medium text-background">
          {badge}
        </span>
      )}

      {value && <span className="text-xs text-muted-foreground">{value}</span>}

      {!value && <ChevronRight className="size-4 text-muted-foreground/50" />}
    </Button>
  );
};

export default MenuItem;
