import { ArrowUpRight, Globe2, Lock, MoreHorizontal } from 'lucide-react';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';

interface Template {
  id: string;
  name: string;
  description?: string;
  visibility: 'private' | 'public';
  createdAt: string;
  updatedAt: string;

  structure?: {
    type: 'institution' | 'program' | 'academic-year' | 'section';
    count: number;
  }[];
}

interface Props {
  template: Template;
  onUse?: () => void;
  onDelete?: () => void;
}

const GraphPreview = () => {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden px-2">
      {/* Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(circle, hsl(var(--border) / 0.35) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />

      {/* Placeholder graph */}
      <div className="relative z-10 flex items-center">
        {/* Node 1 */}
        <div className="h-7 w-12 rounded-md border border-indigo-500/30 bg-indigo-500/10 shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5">
          <div className="flex h-full items-center justify-center">
            <div className="size-2 rounded-sm bg-indigo-500/80" />
          </div>
        </div>

        {/* Connector */}
        <div className="relative h-px w-5 bg-border">
          <div className="absolute right-0 top-1/2 size-1 -translate-y-1/2 rotate-45 border-r border-t border-border" />
        </div>

        {/* Node 2 */}
        <div className="h-8 w-14 rounded-md border border-violet-500/30 bg-violet-500/10 shadow-sm transition-transform duration-200 group-hover:-translate-y-1">
          <div className="flex h-full items-center justify-center">
            <div className="size-2 rounded-sm bg-violet-500/80" />
          </div>
        </div>

        {/* Connector */}
        <div className="relative h-px w-5 bg-border">
          <div className="absolute right-0 top-1/2 size-1 -translate-y-1/2 rotate-45 border-r border-t border-border" />
        </div>

        {/* Node 3 */}
        <div className="h-7 w-12 rounded-md border border-orange-500/30 bg-orange-500/10 shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5">
          <div className="flex h-full items-center justify-center">
            <div className="size-2 rounded-sm bg-orange-500/80" />
          </div>
        </div>
      </div>
    </div>
  );
};

const TemplateCard = ({ template, onUse, onDelete }: Props) => {
  const isPublic = template.visibility === 'public';

  return (
    <Card className="group overflow-hidden rounded-xl border-border/70 bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-md">
      {/* Preview */}
      <div className="relative h-20 overflow-hidden border-b bg-muted/20">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 top-4 size-24 rounded-full bg-blue-500/15 blur-3xl transition-opacity duration-300 group-hover:bg-blue-500/25"
        />

        <GraphPreview />

        {/* Visibility */}
        <div className="absolute left-2.5 top-1 z-20">
          <Badge
            variant="secondary"
            className="h-5 gap-1 rounded-md border bg-background/90 px-1.5 text-[9px] font-medium shadow-sm backdrop-blur"
          >
            {isPublic ? <Globe2 className="size-2.5" /> : <Lock className="size-2.5" />}

            {isPublic ? 'Public' : 'Private'}
          </Badge>
        </div>

        {/* More */}
        <div className="absolute right-2.5 top-1 z-20">
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

      {/* Content */}
      <div className="flex flex-col p-2">
        <div className="flex items-start justify-between gap-1">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold tracking-tight">{template.name}</h3>

            <p className="mt-0.5 line-clamp-2 min-h-8 text-xs leading-4 text-muted-foreground">
              {template.description || 'No description provided.'}
            </p>
          </div>

          <span className="shrink-0 pt-0.5 text-[10px] text-muted-foreground">
            {new Date(template.updatedAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>

        {/* Action */}
        <Button
          variant="outline"
          size="sm"
          onClick={onUse}
          className="h-8 w-full rounded-lg px-3 text-xs transition-colors group-hover:border-primary/30 group-hover:bg-primary/5"
        >
          <span>Use Template</span>

          <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Button>
      </div>
    </Card>
  );
};

export default TemplateCard;
