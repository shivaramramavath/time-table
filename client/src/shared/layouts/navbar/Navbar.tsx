import NavbarLogo from './NavbarLogo';
import NavbarLinks from './NavbarLinks';
import CreateWorkflowBtn from './Create';
import Profile from './profile/Profile';

const Navbar = () => {
  return (
    <div className="flex h-[3.5rem] w-full">
      <nav className="fixed top-0 z-50 flex h-[3.5rem] w-full items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-lg md:px-6">
        <NavbarLogo />

        <NavbarLinks />

        <div className="flex items-center gap-3">
          <CreateWorkflowBtn />
          <Profile />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
