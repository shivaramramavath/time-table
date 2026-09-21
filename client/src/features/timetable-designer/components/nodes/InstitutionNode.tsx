import { memo } from 'react';

import { CalendarDays, Clock3, Coffee, Timer } from 'lucide-react';

import DesignerNode from './DesignerNode';

interface InstitutionNodeProps {
  data: {
    label: string;

    time?: {
      startTime?: string;
      endTime?: string;
      numberOfPeriods?: number;
      workingDays?: string[];

      breaks?: {
        type: 'lunch' | 'short-break';
        startTime: string;
        endTime: string;
      }[];
    };
  };

  isConnectable?: boolean;
  selected?: boolean;
}

const InstitutionNode = ({ data, isConnectable, selected }: InstitutionNodeProps) => {
  const time = data.time;

  return (
    <DesignerNode
      type="institution"
      label={data.label}
      selected={selected}
      showSource
      sourceConnectable={isConnectable}
    >
      {time && (
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock3 size={13} />
            <span>
              {time.startTime ?? '--:--'} - {time.endTime ?? '--:--'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Timer size={13} />
            <span>{time.numberOfPeriods ?? 0}</span>
          </div>
        </div>
      )}
    </DesignerNode>
  );
};

export default memo(InstitutionNode);
