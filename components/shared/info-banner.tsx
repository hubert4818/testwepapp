import { ReactNode } from "react";
import { Info } from "lucide-react";

import { cn } from "@/lib/utils";

type InfoBannerProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
};

export function InfoBanner({ title, description, icon, className }: InfoBannerProps) {
  return (
    <div className={cn("flex gap-4 rounded-3xl border border-primary/15 bg-primary/5 p-5", className)}>
      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        {icon ?? <Info className="h-5 w-5" />}
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
