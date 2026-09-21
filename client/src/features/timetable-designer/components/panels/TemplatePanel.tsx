import { memo } from 'react';
import { FileStack, MoreVertical, Save, Settings } from 'lucide-react';

import { Button } from '@/shared/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

import { useModalStore } from '../../store/modal.store';

const TemplatePanel = () => {
  const openModal = useModalStore((state) => state.open);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="
            size-9 rounded-lg
            bg-background/80
            backdrop-blur
          "
        >
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={6} className="w-48">
        <DropdownMenuItem onClick={() => openModal('template')} className="gap-2">
          <Save className="size-4" />

          <div className="flex flex-col">
            <span>Save as Template</span>

            <span className="text-[10px] text-muted-foreground">Reuse this timetable</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(TemplatePanel);
