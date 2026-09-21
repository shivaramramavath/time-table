import { Handle, Position } from '@xyflow/react';
import { cn } from '@/shared/lib/utils';
import { Card } from '@/shared/ui/card';
import type { ReactNode } from 'react';

import { designerNodes } from '../../constants';

type DesignerNodeType = keyof typeof designerNodes;

interface DesignerNodeProps {
  type: DesignerNodeType;
  label?: string;
  subLabel?: string;
  selected?: boolean;

  showSource?: boolean;
  showTarget?: boolean;

  sourceConnectable?: boolean;
  targetConnectable?: boolean;

  children?: ReactNode;
}

const DesignerNode = ({
  type,
  label,
  subLabel,
  selected,
  showSource = false,
  showTarget = false,
  sourceConnectable = true,
  targetConnectable = true,
  children,
}: DesignerNodeProps) => {
  const config = designerNodes[type];
  const Icon = config.icon;

  return (
    <div className="group relative">
      {/* Target */}
      {showTarget && (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={targetConnectable}
          className="!size-2 !border-2 !border-background !bg-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}

      <Card
        className={cn(
          'rounded-md border bg-background p-2 shadow-sm transition-all',
          'hover:shadow-md',
          selected && 'border-blue-500 shadow-md',
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-2">
          {/* Icon */}
          <div className="flex size-6 shrink-0 items-center justify-center rounded-sm border bg-muted/30">
            <Icon className={cn('size-3.5', config.color)} />
          </div>

          {/* Label */}
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-xs font-semibold leading-tight">{label || 'Untitled'}</h3>

            <p className="truncate text-[9px] leading-tight text-muted-foreground">
              {subLabel || config.title}
            </p>
          </div>
        </div>

        {/* Content */}
        {children && <div className="-mt-2 border-t pt-1">{children}</div>}
      </Card>

      {/* Source */}
      {showSource && (
        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={sourceConnectable}
          className="size-2! !border-2 !border-background !bg-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}
    </div>
  );
};

export default DesignerNode;
