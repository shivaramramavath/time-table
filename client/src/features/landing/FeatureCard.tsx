import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

type FeatureCardProps = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export default function FeatureCard({
  number,
  title,
  description,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <article className="group rounded-2xl border border-neutral-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-xl dark:border-white/10 dark:bg-[#121214] dark:hover:border-white/25">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 dark:bg-white/10">
          <Icon size={23} strokeWidth={1.6} />
        </div>
        <span className="text-xs text-neutral-400">{number}</span>
      </div>
      <h3 className="mt-8 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-neutral-500 dark:text-neutral-400">
        {description}
      </p>
      <div className="mt-7 flex items-center justify-between border-t border-neutral-200 pt-4 text-sm dark:border-white/10">
        <span className="text-neutral-500">Discover more</span>
        <ArrowUpRight
          size={18}
          className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </div>
    </article>
  );
}
