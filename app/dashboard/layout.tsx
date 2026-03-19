import { ReactNode } from "react";

import { requireUser } from "@/lib/auth";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await requireUser();

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
