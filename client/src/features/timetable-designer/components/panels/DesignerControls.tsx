import { memo } from 'react';
import { Card } from '@/shared/ui/card';

import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/shared/ui/tooltip';

import { cn } from '@/shared/lib/utils';

import { designerControls } from '../../constants/designer-controls';
import { useDesignerControls } from '../../hooks/useDesignerControls';

const iconButtonClass =
  'h-9 w-9 p-0 flex items-center justify-center rounded-md transition-all hover:bg-muted duration-200';

const DesignerControls = () => {
  const {
    hasSelection,
    selectAll,
    deleteSelected,
    duplicateSelected,
    autoArrange,
    zoomIn,
    zoomOut,
    fitView,
    undo,
    redo,
  } = useDesignerControls();

  const actions = {
    'select-all': selectAll,
    delete: deleteSelected,
    duplicate: duplicateSelected,
    'auto-arrange': autoArrange,
    'zoom-in': zoomIn,
    'zoom-out': zoomOut,
    'fit-view': fitView,
    undo,
    redo,
  };

  return (
    <TooltipProvider delay={150}>
      <Card className="relative -top-2 flex items-center border p-1 shadow-md">
        <div className="flex flex-wrap items-center gap-2">
          {designerControls.map((control) => {
            const Icon = control.icon;

            const disabled =
              (control.id === 'delete' || control.id === 'duplicate') && !hasSelection;

            return (
              <Tooltip key={control.id}>
                <TooltipTrigger>
                  <div
                    disabled={disabled}
                    className={cn(iconButtonClass, control.className)}
                    onClick={actions[control.id]}
                  >
                    <Icon className="size-4" />
                  </div>
                </TooltipTrigger>

                <TooltipContent side="bottom">{control.label}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </Card>
    </TooltipProvider>
  );
};

export default memo(DesignerControls);
