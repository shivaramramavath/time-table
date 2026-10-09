import { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { Download, Plus, Search, Upload } from 'lucide-react';

import SubjectTable from './SubjectTable';
import SubjectModal from './SubjectModal';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

const Subject = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [addSubjectOpen, setAddSubjectOpen] = useState(false);

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value.trim());
      }, 400),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearch(value);
    debouncedSetSearch(value);
  };

  const handleAddSubject = () => {
    setAddSubjectOpen(true);
  };

  const handleImport = () => {
    console.log('Import subject');
  };

  const handleExport = () => {
    console.log('Export subject');
  };

  return (
    <div>
      <div className="flex items-center gap-3 p-4">
        <div className="relative w-full max-w-xs">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            value={search}
            onChange={handleSearchChange}
            placeholder="Search subjects..."
            className="h-9 border-[#1e1e1e] bg-transparent pl-9 text-xs focus-visible:ring-1 focus-visible:ring-[#6366f1]"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleImport}
            className="h-9 gap-1.5 border-[#1e1e1e] text-xs hover:border-[#2a2a2a]"
          >
            <Upload size={13} />
            Import
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="h-9 gap-1.5 border-[#1e1e1e] text-xs hover:border-[#2a2a2a]"
          >
            <Download size={13} />
            Export
          </Button>

          <Button
            size="sm"
            onClick={handleAddSubject}
            className="h-9 gap-1.5 bg-[#6366f1] text-xs text-white hover:bg-[#5558e8]"
          >
            <Plus size={14} />
            Add Subject
          </Button>
        </div>
      </div>

      <SubjectTable search={debouncedSearch} />

      <SubjectModal open={addSubjectOpen} onClose={() => setAddSubjectOpen(false)} />
    </div>
  );
};

export default Subject;
