import { memo } from 'react';

import DesignerNode from './DesignerNode';
import { BookOpen, DoorOpen, User } from 'lucide-react';

interface AcademicYearNodeProps {
  data: {
    label?: string;
    year?: number;
    semester?: number;

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

const AcademicYearNode = ({ data, isConnectable, selected }: AcademicYearNodeProps) => {
  return (
    <DesignerNode
      type="academic-year"
      label={data?.label}
      subLabel={data?.year ? `Year ${data.year}` : 'Academic Year'}
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

export default memo(AcademicYearNode);
