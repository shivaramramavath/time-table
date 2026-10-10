import { ArrowUpRight, Menu } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "Features", href: "#features" },
  { label: "Explore", href: "#explore" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  return (
    <header className="relative z-20 border-b border-white/10 bg-[#0b0b0d] text-white">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-black text-black">
            U
          </span>
          <span className="text-lg font-bold tracking-tight">
            Studio<span className="text-neutral-500">.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-neutral-400 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="#contact"
            className="hidden items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200 sm:flex"
          >
            Get started <ArrowUpRight size={16} />
          </Link>
          <button
            type="button"
            aria-label="Open navigation"
            className="rounded-lg border border-white/15 p-2 text-white md:hidden"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>
    </header>
  );
}
