import { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({ eyebrow, title, description, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-6 rounded-3xl border border-border/70 bg-card/80 p-6 shadow-soft md:flex-row md:items-end md:justify-between", className)}>
      <div className="space-y-3">
        {eyebrow ? <Badge variant="secondary">{eyebrow}</Badge> : null}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
          {description ? <p className="max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p> : null}
        </div>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}
