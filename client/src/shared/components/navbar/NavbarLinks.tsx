"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/shared/lib/utils";

const links = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Catalogs", path: "/catalogs" },
  { name: "Templates", path: "/templates" },
];

const NavbarLinks = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-4">
        {links.map((link) => {
          const isActive =
            pathname === link.path || pathname.startsWith(`${link.path}/`);

          return (
            <li key={link.path}>
              <Link
                href={link.path}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "text-[13px] font-medium transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400",
                  isActive ? "text-white" : "text-white/50 hover:text-white",
                )}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavbarLinks;
