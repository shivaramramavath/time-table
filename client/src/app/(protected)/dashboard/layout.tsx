import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  userTimetables: ReactNode;
};

export default function DashboardLayout({ children, userTimetables }: Props) {
  return (
    <div className="space-y-8">
      {children}

      {userTimetables}
    </div>
  );
}
