type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-full max-w-md border border-border rounded-2xl p-2">
        <h1 className="text-xl font-bold tracking-tight">
          Time<span className="text-primary">Table</span>
        </h1>
        <div>{children}</div>
      </div>
    </div>
  );
}
