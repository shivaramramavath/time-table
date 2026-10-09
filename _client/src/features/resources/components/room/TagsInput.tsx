import { X } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';

interface TagsInputProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
}

const TagsInput = ({ value = [], onChange, placeholder = 'Add topic...' }: TagsInputProps) => {
  const [input, setInput] = useState('');

  const addTag = () => {
    const tag = input.trim();

    if (!tag || value.includes(tag)) {
      setInput('');
      return;
    }

    onChange?.([...value, tag]);
    setInput('');
  };

  const removeTag = (tagToRemove: string) => {
    onChange?.(value.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag();
    }

    if (event.key === 'Backspace' && !input && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div className="flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-lg border border-border bg-background px-2 py-1.5 focus-within:ring-1 focus-within:ring-ring">
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-md border border-border bg-muted px-2 py-1 text-xs text-muted-foreground"
        >
          {tag}

          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="rounded-sm text-muted-foreground transition-colors hover:text-foreground"
            aria-label={`Remove ${tag}`}
          >
            <X className="size-3" />
          </button>
        </span>
      ))}

      <input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ''}
        className="min-w-[120px] flex-1 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
};

export default TagsInput;
