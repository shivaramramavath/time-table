import { NavLink } from 'react-router-dom';

import { cn } from '@/shared/lib/utils';

const links = [
  { name: 'Timetables', path: '/timetables' },
  { name: 'Templates', path: '/templates' },
  {
    name: 'Resources',
    path: '/resources',
  },
  { name: 'Feedback', path: '/feedback' },
];

const NavbarLinks = () => {
  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-1 rounded-lg border bg-muted/30 p-1">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-2 py-1 text-sm font-medium transition-all duration-200',
                  'text-muted-foreground hover:text-blue-400/50',
                  isActive && 'text-blue-600',
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
