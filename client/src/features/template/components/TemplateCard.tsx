import {
  ArrowUpRight,
  Globe2,
  Lock,
  MoreHorizontal,
} from "lucide-react";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

interface Props {
  template: {
    id: string;
    name: string;
    description?: string;
    visibility: "private" | "public";
    createdAt: string;
    updatedAt: string;
  };
}

const TemplateCard = ({ template }: Props) => {
  const isPublic = template.visibility === "public";

  return (
    <Card className="group overflow-hidden rounded-xl border-border/70 bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-md">
      <div className="relative h-24 overflow-hidden border-b bg-muted/20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 top-4 size-24 rounded-full bg-blue-400/20 blur-3xl transition-opacity duration-300 group-hover:bg-blue-400/30"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] [background-size:20px_20px]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 h-px bg-border/50"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex items-center">
            <div className="h-7 w-12 rounded-md border bg-background shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5" />

            <div className="relative h-px w-5 bg-border">
              <div className="absolute right-0 top-1/2 size-1 -translate-y-1/2 rotate-45 border-r border-t border-border" />
            </div>

            <div className="h-8 w-14 rounded-md border bg-background shadow-sm transition-transform duration-200 group-hover:-translate-y-1" />

            <div className="relative h-px w-5 bg-border">
              <div className="absolute right-0 top-1/2 size-1 -translate-y-1/2 rotate-45 border-r border-t border-border" />
            </div>

            <div className="h-7 w-12 rounded-md border bg-background shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5" />
          </div>
        </div>

        <div className="absolute left-2.5 top-2.5">
          <Badge
            variant="secondary"
            className="h-5 gap-1 rounded-md border bg-background/90 px-1.5 text-[9px] font-medium shadow-sm backdrop-blur"
          >
            {isPublic ? (
              <Globe2 className="size-2.5" />
            ) : (
              <Lock className="size-2.5" />
            )}

            <span>{isPublic ? "Public" : "Private"}</span>
          </Badge>
        </div>

        <div className="absolute right-2.5 top-1.5">
          <Button
            variant="secondary"
            size="icon"
            aria-label={`More options for ${template.name}`}
            className="size-7 rounded-md border bg-background/90 opacity-0 shadow-sm backdrop-blur transition-all duration-200 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-background"
          >
            <MoreHorizontal className="size-3.5" />
          </Button>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold tracking-tight">
              {template.name}
            </h3>

            <p className="mt-0.5 line-clamp-2 min-h-8 text-xs leading-4 text-muted-foreground">
              {template.description || "No description provided."}
            </p>
          </div>

          <span className="shrink-0 pt-0.5 text-[10px] text-muted-foreground">
            {new Date(template.updatedAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="mt-3 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            className="h-8 shrink-0 rounded-lg px-3 text-xs transition-colors group-hover:border-primary/30 group-hover:bg-primary/5"
          >
            <span>Use Template</span>

            <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TemplateCard;