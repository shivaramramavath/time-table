import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarItemData {
  label: string;
  value: string;
  children: SidebarItemData[];
}

interface SidebarItemProps {
  item: SidebarItemData;
  basePath: string;
  level?: number;
  timetableId: string;
}

export const SidebarItem = ({ item, basePath, level = 0, timetableId }: SidebarItemProps) => {
  const [open, setOpen] = useState(false);

  const hasChildren = item.children.length > 0;

  // Leaf node = Section
  if (!hasChildren) {
    return (
      <NavLink
        to={`/timetables/${timetableId}/view/${item.value}`}
        className={({ isActive }) =>
          `
          block rounded-md px-3 py-2 text-sm
          transition-colors
          ${
            isActive
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          }
          `
        }
        style={{
          paddingLeft: `${12 + level * 16}px`,
        }}
      >
        {item.label}
      </NavLink>
    );
  }

  // Parent node = expandable
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        style={{
          paddingLeft: `${12 + level * 16}px`,
        }}
      >
        <ChevronRight
          className={`size-4 shrink-0 transition-transform ${open ? 'rotate-90' : ''}`}
        />

        <span className="truncate">{item.label}</span>
      </button>

      {open && (
        <div>
          {item.children.map((child) => (
            <SidebarItem key={child.value} item={child} basePath={basePath} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
