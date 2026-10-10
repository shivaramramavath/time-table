import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HeroContent() {
  return (
    <div className="max-w-xl">
      <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-neutral-300">
        <Sparkles size={14} className="text-violet-300" />
        Design smarter. Build better.
      </div>

      <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
        Turn your ideas into{" "}
        <span className="text-neutral-500">beautiful experiences.</span>
      </h1>

      <p className="mt-7 max-w-lg text-base leading-8 text-neutral-400 sm:text-lg">
        A modern workspace for designing, exploring, and building digital
        experiences across desktop and mobile.
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-4">
        <Link
          href="#features"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-neutral-200"
        >
          Explore features <ArrowRight size={17} />
        </Link>
        <Link
          href="#about"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/5"
        >
          Learn more <ArrowDown size={16} />
        </Link>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-7">
        <div>
          <p className="text-2xl font-semibold">100%</p>
          <p className="mt-1 text-xs text-neutral-500">Responsive design</p>
        </div>
        <div className="h-10 w-px bg-white/10" />
        <div>
          <p className="text-2xl font-semibold">01</p>
          <p className="mt-1 text-xs text-neutral-500">Unified workspace</p>
        </div>
      </div>
    </div>
  );
}
