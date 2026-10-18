import AuthProvider from "@/providers/AuthProvider";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Providers;
