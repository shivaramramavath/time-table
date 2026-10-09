import * as React from 'react';

import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';

type CraftButtonSize = 'default' | 'sm' | 'lg' | 'icon';

interface CraftButtonContextValue {
  size: CraftButtonSize;
}

const CraftButtonContext = React.createContext<CraftButtonContextValue>({
  size: 'default',
});

interface CraftButtonLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

const CraftButtonLabel = ({ children, className, ...props }: CraftButtonLabelProps) => {
  return (
    <span
      className={cn(
        'relative z-2 transition-colors duration-500 group-hover:text-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};

interface CraftButtonIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

const CraftButtonIcon = ({ children, className, ...props }: CraftButtonIconProps) => {
  const { size } = React.useContext(CraftButtonContext);

  const iconSize = size === 'lg' ? 'size-6' : size === 'sm' ? 'size-4' : 'size-5';

  return (
    <span className={cn('relative z-1', iconSize, className)} {...props}>
      <span
        className={cn(
          'absolute inset-0 -z-1 rounded-full bg-background transition-transform duration-500 group-hover:scale-[15]',
          iconSize,
        )}
      />

      <span
        className={cn(
          'relative z-2 flex items-center justify-center rounded-full bg-background text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-background',
          iconSize,
        )}
      >
        {children}
      </span>
    </span>
  );
};

type CraftButtonProps = React.ComponentProps<typeof Button>;

const CraftButton = ({
  children,
  size = 'default',
  asChild = false,
  className,
  ...props
}: CraftButtonProps) => {
  return (
    <CraftButtonContext.Provider value={{ size }}>
      <Button
        size={size}
        asChild={asChild}
        className={cn(
          'group relative cursor-pointer overflow-hidden rounded-full duration-500',
          'hover:bg-background hover:shadow-md',
          'dark:border dark:border-transparent dark:hover:border-primary/30',
          className,
        )}
        {...props}
      >
        {children}
      </Button>
    </CraftButtonContext.Provider>
  );
};

export { CraftButton, CraftButtonLabel, CraftButtonIcon };
