import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import SearchBar from './SearchBar';
import TimetableList from './TimetableList';

const Timetables = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const handler = debounce((value: string) => {
      setDebouncedQuery(value);
    }, 300);

    handler(query);

    return () => {
      handler.cancel();
    };
  }, [query]);

  return (
    <section className="space-y-6 rounded-xl border border-border/50 p-3">
      <SearchBar query={query} setQuery={setQuery} />

      <TimetableList query={debouncedQuery} />
    </section>
  );
};

export default Timetables;
