import { memo } from 'react';

import DesignerNode from './DesignerNode';
import { BookOpen, DoorOpen, User } from 'lucide-react';

interface SectionNodeProps {
  data: {
    label?: string;
    strength?: number;

    time?: {
      startTime?: string;
      endTime?: string;
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

const SectionNode = ({ data, isConnectable, selected }: SectionNodeProps) => {
  return (
    <DesignerNode
      type="section"
      label={data?.label}
      subLabel="Section"
      selected={selected}
      showTarget
      showSource={false}
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

export default memo(SectionNode);
