import { NavLink } from "react-router-dom";

import { cn } from "@/shared/lib/utils";

const links = [
  { name: "Timetables", path: "/timetables" },
  { name: "Templates", path: "/templates" },
  { name: "Feedback", path: "/feedback" },
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
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200",
                  "text-muted-foreground hover:bg-background/60 hover:text-foreground",
                  isActive && "bg-background text-foreground shadow-sm",
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
