import { ReactNode } from "react";
import { UserRole } from "@prisma/client";

import { SidebarNav } from "@/components/layout/sidebar-nav";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Logo } from "@/components/shared/logo";
import { Badge } from "@/components/ui/badge";
import { adminNav } from "@/lib/constants/navigation";

export function AdminShell({
  children,
  user,
}: {
  children: ReactNode;
  user: { fullName: string; email: string; role: UserRole };
}) {
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
        <main className="space-y-6">
          <div className="flex flex-col gap-4 rounded-3xl border border-border/70 bg-card p-5 shadow-soft md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-lg font-semibold text-foreground">{user.fullName}</p>
                <Badge>ADMIN</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <SignOutButton />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
