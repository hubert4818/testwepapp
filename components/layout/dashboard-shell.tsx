import { ReactNode } from "react";

import { Logo } from "@/components/shared/logo";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { dashboardNav } from "@/lib/constants/navigation";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container grid gap-6 py-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-3xl border border-border/70 bg-card p-5 shadow-soft">
          <div className="mb-6">
            <Logo />
          </div>
          <SidebarNav items={dashboardNav} />
        </aside>
        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
}
