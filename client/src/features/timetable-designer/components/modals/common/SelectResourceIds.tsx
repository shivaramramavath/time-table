import { useEffect, useState, type ReactNode } from 'react';

import { Check, X } from 'lucide-react';

interface Resource {
  id: string;
  name: string;
}

interface Props<T extends Resource> {
  getAll: (query: string) => Promise<T[]> | T[];

  initialSelectedIds?: string[];

  setSelectedIds: (ids: string[]) => void;

  placeholder?: string;

  renderMeta?: (resource: T) => ReactNode;
}

const SelectResourceIds = <T extends Resource>({
  getAll,
  initialSelectedIds = [],
  setSelectedIds,
  placeholder = 'Search...',
  renderMeta,
}: Props<T>) => {
  const [query, setQuery] = useState('');

  const [selectedResources, setSelectedResources] = useState<Resource[]>([]);

  const [resources, setResources] = useState<T[]>([]);

  const [loading, setLoading] = useState(false);

  /*
   * Load initially selected resources
   */
  useEffect(() => {
    let cancelled = false;

    const loadSelectedResources = async () => {
      if (initialSelectedIds.length === 0) {
        setSelectedResources([]);
        return;
      }

      const allResources = await getAll('');

      if (cancelled) return;

      const selected = allResources
        .filter((resource) => initialSelectedIds.includes(resource.id))
        .map((resource) => ({
          id: resource.id,
          name: resource.name,
        }));

      setSelectedResources(selected);
    };

    loadSelectedResources();

    return () => {
      cancelled = true;
    };
  }, [getAll, initialSelectedIds.join('|')]);

  /*
   * Load search results
   */
  useEffect(() => {
    let cancelled = false;

    const searchResources = async () => {
      const value = query.trim();

      if (!value) {
        setResources([]);
        return;
      }

      setLoading(true);

      try {
        const result = await getAll(value);

        if (!cancelled) {
          setResources(result);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    searchResources();

    return () => {
      cancelled = true;
    };
  }, [query, getAll]);

  const isSelected = (resourceId: string) => {
    return selectedResources.some((resource) => resource.id === resourceId);
  };

  const handleToggle = (resource: T) => {
    setSelectedResources((current) => {
      const exists = current.some((item) => item.id === resource.id);

      if (exists) {
        const next = current.filter((item) => item.id !== resource.id);

        setSelectedIds(next.map((item) => item.id));

        return next;
      }

      const next = [
        ...current,
        {
          id: resource.id,
          name: resource.name,
        },
      ];

      setSelectedIds(next.map((item) => item.id));

      return next;
    });

    setQuery('');
    setResources([]);
  };

  const handleRemove = (resourceId: string) => {
    setSelectedResources((current) => {
      const next = current.filter((resource) => resource.id !== resourceId);

      setSelectedIds(next.map((resource) => resource.id));

      return next;
    });
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="flex min-h-10 flex-wrap items-center gap-1.5 rounded-md border bg-background px-2 py-1.5 focus-within:ring-1 focus-within:ring-ring">
          {selectedResources.map((resource) => (
            <div
              key={resource.id}
              className="flex items-center gap-1 rounded bg-muted px-2 py-1 text-xs"
            >
              <span className="max-w-40 truncate">{resource.name}</span>

              <button
                type="button"
                onClick={() => handleRemove(resource.id)}
                className="rounded-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <X size={12} />
              </button>
            </div>
          ))}

          <input
            type="text"
            value={query}
            placeholder={selectedResources.length === 0 ? placeholder : 'Add...'}
            onChange={(event) => setQuery(event.target.value)}
            className="min-w-32 flex-1 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        {query.trim() && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-md border bg-popover p-1 shadow-md">
            {loading ? (
              <div className="px-3 py-6 text-center text-xs text-muted-foreground">
                Searching...
              </div>
            ) : resources.length > 0 ? (
              resources.map((resource) => {
                const selected = isSelected(resource.id);

                return (
                  <button
                    key={resource.id}
                    type="button"
                    onClick={() => handleToggle(resource)}
                    className="flex w-full items-center justify-between rounded-sm px-2.5 py-2 text-left transition-colors hover:bg-muted"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium">{resource.name}</p>

                      {renderMeta && (
                        <div className="mt-0.5 text-[10px] text-muted-foreground">
                          {renderMeta(resource)}
                        </div>
                      )}
                    </div>

                    {selected && <Check size={14} className="ml-3 shrink-0 text-primary" />}
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-6 text-center text-xs text-muted-foreground">
                No resources found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectResourceIds;
