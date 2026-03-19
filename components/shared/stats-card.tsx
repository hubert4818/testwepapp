import { Card, CardContent } from "@/components/ui/card";

type StatsCardProps = {
  label: string;
  value: string;
  description: string;
};

export function StatsCard({ label, value, description }: StatsCardProps) {
  return (
    <Card className="border-border/70 bg-card/90">
      <CardContent className="space-y-3 p-6">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-semibold tracking-tight text-foreground">{value}</p>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
