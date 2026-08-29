import React from "react";
import { NavLink } from "react-router-dom";

import { cn } from "@/shared/lib/utils";

const links = [
  {
    name: "Timetables",
    path: "/timetables",
  },
  {
    name: "Templates",
    path: "/templates",
  },
  {
    name: "Feedback",
    path: "/feedback",
  },
];

const NavbarLinks = () => {
  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-1 rounded-lg bg-muted/50 p-1">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium",
                  "text-muted-foreground transition-colors",
                  "hover:text-foreground",
                  isActive && "text-foreground",
                )
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavbarLinks;
