import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { requireUser } from "@/lib/auth";
import { formatCurrency, getBookingPageData, getStatusLabel, mapStatusToBadge } from "@/lib/db/dashboard";
import { APP_CONFIG } from "@/lib/config/app";

export default async function DashboardBookingsPage() {
  const user = await requireUser();
  const bookings = await getBookingPageData(user.id);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Lịch hẹn"
        title="Các buổi trao đổi qua Zoom"
        description="Trang này đọc dữ liệu thật từ ZoomBooking để bạn kiểm tra lịch, người xác nhận và liên kết với yêu cầu phân tích."
      />
      <SectionCard title="Khung dịch vụ" description={`Giá hiện tại cho mỗi buổi trao đổi là ${formatCurrency(APP_CONFIG.HIEU_ZOOM_PRICE)}.`}>
        <p className="text-sm leading-6 text-muted-foreground">Đặng Ngọc Hiếu – một người chủ quán thích chia sẻ mọi thứ mình biết</p>
      </SectionCard>
      <SectionCard title="Danh sách lịch hẹn" description="Các booking đã tạo của tài khoản hiện tại.">
        <div className="space-y-3">
          {bookings.length === 0 ? (
            <p className="text-sm text-muted-foreground">Chưa có lịch hẹn nào.</p>
          ) : (
            bookings.map((item) => (
              <div key={item.id} className="rounded-2xl border border-border/70 bg-background p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-medium text-foreground">{item.analysisRequest?.title ?? "Buổi trao đổi độc lập"}</p>
                    <p className="text-sm text-muted-foreground">{item.scheduledAt ? new Intl.DateTimeFormat("vi-VN", { dateStyle: "full", timeStyle: "short" }).format(item.scheduledAt) : "Chưa chốt thời gian"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={mapStatusToBadge(item.status)} />
                    <p className="font-semibold text-foreground">{formatCurrency(item.amountCharged)}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{item.note ?? "Chưa có ghi chú thêm."}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.confirmedBy ? `Đã xác nhận bởi ${item.confirmedBy.fullName}.` : getStatusLabel(item.status)}</p>
              </div>
            ))
          )}
        </div>
      </SectionCard>
    </div>
  );
}
