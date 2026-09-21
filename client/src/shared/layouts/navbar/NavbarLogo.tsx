import { NavLink } from 'react-router-dom';

const NavbarLogo = () => {
  return (
    <NavLink
      to="/"
      className="roboto flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground transition-all hover:text-blue-500"
    >
      Intelli Schedule
    </NavLink>
  );
};

export default NavbarLogo;
