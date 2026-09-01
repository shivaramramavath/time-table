import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import CreateWorkflowBtn from "./Create";
import Profile from "./profile/Profile";

const Navbar = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex h-[3.5rem] items-center justify-between border-b border-blue-500 bg-background/80 px-4 backdrop-blur-lg md:px-6">
      <NavbarLogo />

      <NavbarLinks />

      <div className="flex items-center gap-3">
        <CreateWorkflowBtn />
        <Profile />
      </div>
    </nav>
  );
};

export default Navbar;
