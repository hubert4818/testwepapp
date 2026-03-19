import { ReactNode } from "react";

import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";

type DashboardPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: { label: string; value: string }[];
  emptyTitle: string;
  emptyDescription: string;
  actionLabel?: string;
  secondary?: ReactNode;
};

export function DashboardPageTemplate({
  eyebrow,
  title,
  description,
  highlights,
  emptyTitle,
  emptyDescription,
  actionLabel,
  secondary,
}: DashboardPageProps) {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={actionLabel ? <Button>{actionLabel}</Button> : undefined}
      />
      <SectionCard title="Tổng quan nhanh" description="Không gian này đã sẵn sàng để gắn dữ liệu thật ở bước tiếp theo.">
        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.label} className="rounded-2xl border border-border/70 bg-background p-4">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>Trạng thái demo:</span>
          <StatusBadge status="active" />
        </div>
      </SectionCard>
      {secondary}
      <EmptyState title={emptyTitle} description={emptyDescription} action={actionLabel ? <Button variant="outline">{actionLabel}</Button> : undefined} />
    </div>
  );
}
