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
    <section className="min-h-0 h-full flex-1 flex flex-col">
      {/* Search + Filters */}
      <div className="mb-6 flex shrink-0 flex-col gap-3 lg:flex-row lg:items-center">
        <div className="min-w-0 flex-1">
          <SearchBar query={query} setQuery={setQuery} />
        </div>

        <TimetableFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClear={handleClearFilters}
          hasFilters={hasFilters}
        />
      </div>

      {/* Scrollable List */}
      <div className="min-h-0 flex-1">
        <TimetableList query={debouncedQuery} filters={filters} />
      </div>
    </section>
  );
};

export default Timetables;
