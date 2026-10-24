import QueryProvider from "@/providers/QueryProvider";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default Providers;
