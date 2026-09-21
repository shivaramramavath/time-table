
import { memo, useMemo } from "react";

import TemplateCard from "./TemplateCard";
import TemplateEmptyState from "./TemplateEmptyState";
import TemplateSkeleton from "./TemplateSkeleton";
import { useTemplateQuery } from "../hooks/template.query";

interface Props {
  tab: "my" | "public";
  search: string;
}

interface Template {
  id: string;
  name: string;
  description?: string;
  visibility: "private" | "public";
  createdAt: string;
  updatedAt: string;
}

const TemplateGrid = ({ tab, search }: Props) => {
  const myTemplates = useTemplateQuery.useGetTemplates();
  const publicTemplates = useTemplateQuery.useGetPublicTemplates();

  const query = tab === "my" ? myTemplates : publicTemplates;

  const { data, isLoading, isError } = query;

  const templates = useMemo<Template[]>(() => {
    const items: Template[] = data?.data ?? data ?? [];
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return items;
    }

    return items.filter((template) => {
      const name = template.name.toLowerCase();
      const description = template.description?.toLowerCase() ?? "";

      return (
        name.includes(normalizedSearch) ||
        description.includes(normalizedSearch)
      );
    });
  }, [data, search]);

  if (isLoading) {
    return (
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="grid gap-4 pb-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <TemplateSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">
          <p className="text-sm font-medium">Failed to load templates</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!templates.length) {
    return <TemplateEmptyState type={tab} />;
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <div className="grid gap-4 pb-4 sm:grid-cols-3 lg:grid-cols-4">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
};

export default memo(TemplateGrid);
