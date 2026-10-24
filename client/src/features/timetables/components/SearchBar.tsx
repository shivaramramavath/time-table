"use client";

import { Input } from "@base-ui/react";
import debounce from "lodash/debounce";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useTimetablesStore } from "../store/timetable.store";

const SearchBar = () => {
  const query = useTimetablesStore((state) => state.query);
  const setQuery = useTimetablesStore((state) => state.setQuery);

  const [inputValue, setInputValue] = useState(query);

  const debouncedSetQuery = useMemo(
    () => debounce((value: string) => setQuery(value), 300),
    [setQuery],
  );

  useEffect(() => {
    return () => {
      debouncedSetQuery.cancel();
    };
  }, [debouncedSetQuery]);

  const handleChange = (value: string) => {
    setInputValue(value);
    debouncedSetQuery(value);
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex w-full items-center gap-2 rounded-lg border border-border/50 bg-muted/30 px-3 py-2 backdrop-blur-sm transition focus-within:ring-2 focus-within:ring-ring/50">
        <Search size={16} className="shrink-0 text-muted-foreground" />

        <Input
          type="search"
          value={inputValue}
          onChange={(event) => handleChange(event.target.value)}
          placeholder="Search timetables..."
          aria-label="Search timetables"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
    </div>
  );
};

export default SearchBar;
