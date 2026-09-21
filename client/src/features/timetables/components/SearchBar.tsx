import { Search } from 'lucide-react';

interface SearchBarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ query, setQuery }: SearchBarProps) => {
  return (
    <div className="w-full max-w-md">
      <div className="flex w-full max-w-md items-center gap-2 rounded-lg border border-border/50 bg-muted/30 px-3 py-2 backdrop-blur-sm transition focus-within:ring-2 focus-within:ring-ring/50">
        <Search size={16} className="shrink-0 text-muted-foreground" />

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search timetables..."
          aria-label="Search timetables"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
    </div>
  );
};

export default SearchBar;
