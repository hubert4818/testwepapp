import { ReactNode } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type SectionCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function SectionCard({ title, description, children, footer }: SectionCardProps) {
  return (
    <Card className="overflow-hidden border-border/70 bg-card/90">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="space-y-5">
        {children}
        {footer ? <div className="border-t border-border/70 pt-5">{footer}</div> : null}
      </CardContent>
    </Card>
  );
}
