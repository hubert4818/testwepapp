import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCurrency, getAdminBookingsPageData, getStatusLabel, mapStatusToBadge } from "@/lib/db/dashboard";

export default async function AdminBookingsPage() {
  const bookings = await getAdminBookingsPageData();

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Quản trị / Lịch hẹn" title="Điều phối lịch trao đổi" description="Khu quản trị có thể kiểm tra danh sách booking, người dùng và liên kết với yêu cầu phân tích tương ứng." />
      <SectionCard title="Danh sách lịch hẹn" description="Dữ liệu thật lấy từ ZoomBooking và các quan hệ liên quan.">
        <div className="space-y-3">
          {bookings.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border/70 bg-background p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium text-foreground">{item.user.fullName}</p>
                  <p className="text-sm text-muted-foreground">{item.analysisRequest?.title ?? "Chưa gắn yêu cầu phân tích"}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={mapStatusToBadge(item.status)} />
                  <p className="font-semibold text-foreground">{formatCurrency(item.amountCharged)}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{item.scheduledAt ? new Intl.DateTimeFormat("vi-VN", { dateStyle: "full", timeStyle: "short" }).format(item.scheduledAt) : "Chưa chốt thời gian"}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.confirmedBy ? `Xác nhận bởi ${item.confirmedBy.fullName}.` : getStatusLabel(item.status)}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
