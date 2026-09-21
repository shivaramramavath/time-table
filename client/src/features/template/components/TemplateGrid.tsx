import { memo, useMemo } from "react";

import TemplateCard from "./TemplateCard";
import TemplateEmptyState from "./TemplateEmptyState";
import TemplateSkeleton from "./TemplateSkeleton";
import { useTemplateQuery } from "../hooks/template.query";

interface Props {
  tab: "my" | "public";
  search: string;
}

const TemplateGrid = ({ tab, search }: Props) => {
  const myTemplates = useTemplateQuery.useGetTemplates();

  const publicTemplates = useTemplateQuery.useGetPublicTemplates();

  const query = tab === "my" ? myTemplates : publicTemplates;

  const { data, isLoading, isError } = query;

  const templates = useMemo(() => {
    const items = data?.data ?? data ?? [];

    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return items;
    }

    return items.filter(
      (template: { name: string; description?: string }) =>
        template.name.toLowerCase().includes(normalizedSearch) ||
        template.description?.toLowerCase().includes(normalizedSearch),
    );
  }, [data, search]);

  if (isLoading) {
    return (
      <div
        className="
          grid gap-4
          sm:grid-cols-3
          lg:grid-cols-4
        "
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <TemplateSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/20 p-8 text-center">
        <p className="text-sm font-medium">Failed to load templates</p>

        <p className="mt-1 text-xs text-muted-foreground">
          Please try again later.
        </p>
      </div>
    );
  }

  if (!templates.length) {
    return <TemplateEmptyState type={tab} />;
  }

  return (
    <div
      className="
        grid gap-4
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >
      {templates.map((template: any) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </div>
  );
};

export default memo(TemplateGrid);
