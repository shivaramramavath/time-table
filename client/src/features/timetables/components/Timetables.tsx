import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import SearchBar from './SearchBar';
import TimetableFilters from './TimetableFilters';
import TimetableList from './TimetableList';

export type TimetableFiltersState = {
  department: string;
  academicYear: string;
  stage: string;
  sort: string;
};

const DEFAULT_FILTERS: TimetableFiltersState = {
  department: 'all',
  academicYear: 'all',
  stage: 'all',
  sort: 'recent',
};

const Timetables = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const [filters, setFilters] = useState<TimetableFiltersState>(DEFAULT_FILTERS);

  useEffect(() => {
    const handler = debounce((value: string) => {
      setDebouncedQuery(value);
    }, 300);

    handler(query);

    return () => {
      handler.cancel();
    };
  }, [query]);

  const handleFilterChange = (key: keyof TimetableFiltersState, value: string) => {
    setFilters((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const hasFilters =
    filters.department !== 'all' || filters.academicYear !== 'all' || filters.stage !== 'all';

  return (
    <section className="space-y-6 rounded-xl border border-border/50 p-3">
      {/* Search + Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="min-w-0 flex-1">
          <SearchBar query={query} setQuery={setQuery} />
        </div>

        {/* Filters */}
        <TimetableFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClear={handleClearFilters}
          hasFilters={hasFilters}
        />
      </div>

      {/* List */}
      <TimetableList query={debouncedQuery} filters={filters} />
    </section>
  );
};

export default Timetables;
