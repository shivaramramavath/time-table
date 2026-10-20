import NavbarLinks from "./NavbarLinks";
import NavbarLogo from "./NavbarLogo";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <nav
        aria-label="Main navigation"
        className="h-14 flex justify-between items-center"
      >
        <NavbarLogo />

        <div className="flex items-center gap-5">
          <NavbarLinks />
          <ProfileMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
