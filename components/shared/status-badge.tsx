import { Badge } from "@/components/ui/badge";

type StatusBadgeProps = {
  status: "draft" | "pending" | "completed" | "cancelled" | "active";
};

const statusMap = {
  draft: { label: "Nháp", variant: "secondary" as const },
  pending: { label: "Đang chờ", variant: "warning" as const },
  completed: { label: "Hoàn tất", variant: "success" as const },
  cancelled: { label: "Đã huỷ", variant: "destructive" as const },
  active: { label: "Đang hoạt động", variant: "default" as const },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const item = statusMap[status];
  return <Badge variant={item.variant}>{item.label}</Badge>;
}
