import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatsCard } from "@/components/shared/stats-card";
import { getAdminDashboardData } from "@/lib/db/dashboard";

export default async function AdminHomePage() {
  const data = await getAdminDashboardData();

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Quản trị" title="Tổng quan vận hành" description="Dữ liệu tổng hợp đang được lấy trực tiếp từ database để hỗ trợ kiểm tra nhanh toàn app." />
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard label="Người dùng" value={String(data.users)} description="Tổng số tài khoản trong hệ thống." />
        <StatsCard label="Topup chờ duyệt" value={String(data.pendingTopups)} description="Các yêu cầu nạp tiền cần xử lý." />
        <StatsCard label="Phân tích đang mở" value={String(data.activeAnalyses)} description="Các yêu cầu chưa hoàn tất." />
        <StatsCard label="Lịch đã xác nhận" value={String(data.bookings)} description="Các buổi Zoom đã được chốt." />
      </div>
      <SectionCard title="Nhật ký gần đây" description="Các bản ghi AuditLog mới nhất.">
        <div className="space-y-3">
          {data.recentAuditLogs.length === 0 ? (
            <p className="text-sm text-muted-foreground">Chưa có bản ghi audit nào.</p>
          ) : (
            data.recentAuditLogs.map((item) => (
              <div key={item.id} className="rounded-2xl border border-border/70 bg-background p-4">
                <p className="font-medium text-foreground">{item.action}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.description ?? `${item.entityType} / ${item.entityId}`}</p>
                <p className="mt-2 text-xs text-muted-foreground">{new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeStyle: "short" }).format(item.createdAt)}</p>
              </div>
            ))
          )}
        </div>
      </SectionCard>
    </div>
  );
}
