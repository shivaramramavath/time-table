import Link from "next/link";

const NavbarLogo = () => {
  return (
    <Link
      href="/dashboard"
      aria-label="Intelli Schedule dashboard"
      className="group inline-flex items-center gap-1.5"
    >
      <span className="text-[17px] font-semibold tracking-tight text-white">
        Intelli
      </span>

      <span className="text-[17px] font-semibold tracking-tight text-primary">
        Schedule
      </span>
    </Link>
  );
};

export default NavbarLogo;
