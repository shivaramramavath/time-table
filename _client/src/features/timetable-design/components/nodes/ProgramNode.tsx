import { memo } from 'react';

import DesignerNode from './DesignerNode';
import { BookOpen, DoorOpen, User } from 'lucide-react';

interface ProgramNodeProps {
  data: {
    label: string;

    time?: {
      startTime?: string;
      endTime?: string;
      periodDuration?: number;
      numberOfPeriods?: number;
    };

    resources?: {
      facultyIds?: string[];
      subjectIds?: string[];
      roomIds?: string[];
    };
  };

  isConnectable?: boolean;
  selected?: boolean;
}

const ProgramNode = ({ data, isConnectable, selected }: ProgramNodeProps) => {
  return (
    <DesignerNode
      type="program"
      label={data?.label}
      subLabel={'Program'}
      selected={selected}
      showTarget
      showSource
      sourceConnectable={isConnectable}
    >
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <User size={15} />
          <span>{data.resources?.facultyIds?.length ?? 0}</span>
        </div>

        <div className="flex items-center gap-1">
          <BookOpen size={15} />
          <span>{data.resources?.subjectIds?.length ?? 0}</span>
        </div>

        <div className="flex items-center gap-1">
          <DoorOpen size={15} />
          <span>{data.resources?.roomIds?.length ?? 0}</span>
        </div>
      </div>
    </DesignerNode>
  );
};

export default memo(ProgramNode);
