import { useState } from 'react';
import { ChevronDown, ChevronRight, FileText, Folder } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

interface SidebarItemData {
  label: string;
  value: string;
  children: SidebarItemData[];
}

interface SidebarItemProps {
  item: SidebarItemData;
  basePath: string;
  level?: number;
}

export const SidebarItem = ({ item, basePath, level = 0 }: SidebarItemProps) => {
  const { pathname } = useLocation();

  const hasChildren = item.children.length > 0;

  const isItemActive = (currentItem: SidebarItemData): boolean => {
    const itemPath = `${basePath}/${currentItem.value}`;

    if (pathname === itemPath) {
      return true;
    }

    return currentItem.children.some(isItemActive);
  };

  const isActive = isItemActive(item);

  const [open, setOpen] = useState(level === 0 || isActive);

  /*
   * ---------------------------------------------------------
   * LEAF / FILE
   * ---------------------------------------------------------
   */

  if (!hasChildren) {
    return (
      <NavLink
        to={`${basePath}/${item.value}`}
        className={`
          group relative flex h-8 items-center gap-2
          rounded-md text-[12px]
          transition-all duration-150
          ${
            isActive
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
          }
        `}
        style={{
          paddingLeft: `${12 + level * 20}px`,
          paddingRight: '8px',
        }}
      >
        {/* Active indicator */}
        {isActive && (
          <span
            aria-hidden="true"
            className="
              absolute left-0 top-1/2
              h-5 w-0.5
              -translate-y-1/2
              rounded-full
              bg-primary
              shadow-[0_0_8px_hsl(var(--primary)/0.45)]
            "
          />
        )}

        {level > 0 && (
          <>
            {/* Curved connector to file */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                h-4 w-3
                rounded-bl-md
                border-b
                border-l
                border-primary/35
              "
              style={{
                left: `${level * 20 - 2}px`,
                top: '50%',
                transform: 'translateY(-100%)',
              }}
            />

            {/* Vertical connector above curve */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                top-0
                h-1/2
                w-px
                bg-primary/35
              "
              style={{
                left: `${level * 20 - 2}px`,
              }}
            />
          </>
        )}

        {/* File icon */}
        <FileText
          size={14}
          strokeWidth={1.6}
          className={
            isActive
              ? 'shrink-0 text-primary'
              : 'shrink-0 text-muted-foreground/70 group-hover:text-primary/80'
          }
        />

        <span className="truncate">{item.label}</span>
      </NavLink>
    );
  }

  /*
   * ---------------------------------------------------------
   * FOLDER / PARENT
   * ---------------------------------------------------------
   */

  return (
    <div className="relative">
      {/* Folder row */}
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className={`
          group relative flex h-8 w-full
          items-center gap-1.5
          rounded-md px-2 text-left
          text-[12px] font-medium
          transition-all duration-150
          ${
            isActive
              ? 'text-primary'
              : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
          }
        `}
        style={{
          paddingLeft: `${8 + level * 20}px`,
        }}
      >
        {/* Curved connector for nested folders */}
        {level > 0 && (
          <>
            {/* Vertical part */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                w-px
                bg-primary/35
              "
              style={{
                left: `${level * 20 - 2}px`,
                top: 0,
                height: '50%',
              }}
            />

            {/* Curved corner */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                h-4 w-3
                rounded-bl-md
                border-b
                border-l
                border-primary/35
              "
              style={{
                left: `${level * 20 - 2}px`,
                top: '50%',
                transform: 'translateY(-100%)',
              }}
            />
          </>
        )}

        {/* Chevron */}
        <span className="flex size-4 shrink-0 items-center justify-center">
          {open ? (
            <ChevronDown
              size={13}
              strokeWidth={1.8}
              className={isActive ? 'text-primary' : 'text-muted-foreground'}
            />
          ) : (
            <ChevronRight
              size={13}
              strokeWidth={1.8}
              className={isActive ? 'text-primary' : 'text-muted-foreground'}
            />
          )}
        </span>

        {/* Folder */}
        <Folder
          size={14}
          strokeWidth={1.6}
          className={
            isActive ? 'text-primary' : 'text-muted-foreground/70 group-hover:text-primary/80'
          }
        />

        {/* Label */}
        <span className="truncate">{item.label}</span>
      </button>

      {/* Children */}
      {open && (
        <div className="relative">
          {/* Main vertical tree line */}
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              top-0
              bottom-2
              w-px
              bg-primary/35
            "
            style={{
              left: `${level * 20 + 18}px`,
            }}
          />

          {item.children.map((child) => (
            <SidebarItem key={child.value} item={child} basePath={basePath} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
