import { memo, useMemo, useState } from 'react';

import { Input } from '@/shared/ui/input';

import SubjectCard from './SubjectCard';

import { useDesignerStore } from '../../../store/designer.store';

interface Props {
  onEdit: (subjectId: string) => void;
}

const SubjectList = ({ onEdit }: Props) => {
  const [query, setQuery] = useState('');

  const subjects = useDesignerStore((state) => state.subjects);

  const filteredSubjects = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return subjects;
    }

    return subjects.filter(
      (subject) =>
        subject.name.toLowerCase().includes(search) || subject.code.toLowerCase().includes(search),
    );
  }, [subjects, query]);

  return (
    <div className="flex h-[70vh] flex-col gap-3">
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search subject..."
        className="h-8"
      />

      <div className="scrollbar min-h-0 flex-1 space-y-2 overflow-y-auto">
        {filteredSubjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} onEdit={onEdit} />
        ))}

        {!filteredSubjects.length && (
          <div className="py-8 text-center text-xs text-muted-foreground">
            {query ? 'No subjects found' : 'No subjects yet'}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(SubjectList);
