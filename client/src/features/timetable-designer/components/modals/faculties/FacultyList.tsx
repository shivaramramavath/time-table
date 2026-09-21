import { memo, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { useDesignerStore } from '../../../store/designer.store';

import FacultyCard from './FacultyCard';

interface Props {
  onAdd: () => void;
  onEdit: (facultyId: string) => void;
}

const FacultyList = ({ onAdd, onEdit }: Props) => {
  const [search, setSearch] = useState('');

  const faculties = useDesignerStore((state) => state.faculties);

  const filteredFaculties = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return faculties;
    }

    return faculties.filter(
      (faculty) =>
        faculty.name.toLowerCase().includes(query) ||
        faculty.email.toLowerCase().includes(query) ||
        faculty.department?.toLowerCase().includes(query),
    );
  }, [faculties, search]);

  return (
    <div className="flex h-[70vh] flex-col">
      <div className="shrink-0 space-y-3 border-b pb-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold tracking-tight">Faculties</h3>

              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {faculties.length}
              </span>
            </div>

            <p className="mt-0.5 text-[11px] text-muted-foreground">Manage faculty members</p>
          </div>

          <Button size="sm" onClick={onAdd} className="h-8 gap-1.5 rounded-md">
            <Plus size={14} />
            Add Faculty
          </Button>
        </div>

        <Input
          placeholder="Search faculty..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-8 bg-muted/30 text-xs"
        />
      </div>

      <div className="scrollbar min-h-0 flex-1 overflow-y-auto py-3">
        <div className="space-y-1.5">
          {filteredFaculties.map((faculty) => (
            <FacultyCard key={faculty.id} faculty={faculty} onEdit={onEdit} />
          ))}
        </div>

        {!filteredFaculties.length && (
          <div className="flex min-h-48 flex-col items-center justify-center px-6 text-center">
            <p className="text-xs font-medium">
              {search ? 'No faculties found' : 'No faculties yet'}
            </p>

            <p className="mt-1 max-w-52 text-[10px] leading-relaxed text-muted-foreground">
              {search
                ? 'Try searching with another faculty name or department.'
                : 'Add faculty members to assign them to subjects.'}
            </p>

            {!search && (
              <Button size="sm" variant="outline" className="mt-3 h-7 text-[11px]" onClick={onAdd}>
                <Plus size={13} />
                Add Faculty
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(FacultyList);
