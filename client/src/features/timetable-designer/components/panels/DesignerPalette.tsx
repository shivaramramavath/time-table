import { memo } from 'react';

import { Card } from '@/shared/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';

import { catalogItems, designerNodes } from '../../constants';
import { useDesignerDnD } from '../../hooks';
import { useModalStore } from '../../store/modal.store';

const DesignerPalette = () => {
  const handleOpenModal = useModalStore((s) => s.open);
  const { onDragStart } = useDesignerDnD();

  return (
    <TooltipProvider delay={150}>
      <div className="group relative -left-2 top-15 transition-all space-y-5 duration-150 hover:w-full">
        <Card className="flex h-full flex-col gap-2 p-1">
          <div className="flex flex-col space-y-1">
            {Object.entries(designerNodes).map(([type, node]) => {
              const Icon = node.icon;

              return (
                <Tooltip key={type}>
                  <TooltipTrigger>
                    <div
                      draggable
                      onDragStart={(event) => onDragStart(event, type)}
                      className="flex cursor-grab border-b items-center gap-2 rounded-lg p-1 shadow-sm transition-all hover:bg-muted active:cursor-grabbing"
                    >
                      <div className="rounded-md p-0.5">
                        <Icon className={`size-7 ${node.color}`} />
                      </div>
                    </div>
                  </TooltipTrigger>

                  <TooltipContent side="right">{node.title}</TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </Card>
        <Card className="flex h-full flex-col gap-2 p-1">
          <div className="flex flex-col space-y-1">
            {catalogItems.map((item) => {
              const Icon = item.icon;

              return (
                <Tooltip key={item.type}>
                  <TooltipTrigger>
                    <div
                      onClick={() => handleOpenModal(item.type)}
                      className="flex cursor-pointer border-b items-center gap-2 rounded-lg p-1 shadow-sm transition-all hover:bg-muted"
                    >
                      <div className="rounded-md p-0.5">
                        <Icon className={`size-7 ${item.color}`} />
                      </div>
                    </div>
                  </TooltipTrigger>

                  <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default memo(DesignerPalette);
