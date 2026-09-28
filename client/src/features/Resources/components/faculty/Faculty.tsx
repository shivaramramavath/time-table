import { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { Download, Plus, Search, Upload } from 'lucide-react';

import FacultyTable from './FaclutyTable';
import FacultyModal from './FacultyModal';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

const Faculty = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [addFacultyOpen, setAddFacultyOpen] = useState(false);

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

  const handleAddFaculty = () => {
    setAddFacultyOpen(true);
  };

  const handleImport = () => {
    console.log('Import faculty');
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
            placeholder="Search faculty..."
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
            size="sm"
            onClick={handleAddFaculty}
            className="h-9 gap-1.5 bg-[#6366f1] text-xs text-white hover:bg-[#5558e8]"
          >
            <Plus size={14} />
            Add Faculty
          </Button>
        </div>
      </div>

      <FacultyTable search={debouncedSearch} />

      <FacultyModal open={addFacultyOpen} onClose={() => setAddFacultyOpen(false)} />
    </div>
  );
};

export default Faculty;
