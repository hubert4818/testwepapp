import { ReactNode } from "react";

import { Logo } from "@/components/shared/logo";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { adminNav } from "@/lib/constants/navigation";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950/[0.02]">
      <div className="container grid gap-6 py-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-3xl border border-border/70 bg-card p-5 shadow-soft">
          <div className="mb-6">
            <Logo />
          </div>
          <div className="mb-4 rounded-2xl bg-primary/5 px-4 py-3 text-sm text-primary">Khu vực quản trị nội bộ</div>
          <SidebarNav items={adminNav} />
        </aside>
        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
}
