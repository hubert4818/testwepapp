import { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Card className="border-dashed border-border/80 bg-card/70">
      <CardContent className="flex flex-col items-start gap-4 p-8">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        {action}
      </CardContent>
    </Card>
  );
}
