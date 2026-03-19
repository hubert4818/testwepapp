import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { requireUser } from "@/lib/auth";
import { formatCurrency, getStatusLabel, getTopupPageData, mapStatusToBadge } from "@/lib/db/dashboard";

export default async function DashboardTopupPage() {
  const user = await requireUser();
  const topups = await getTopupPageData(user.id);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Nạp tiền" title="Theo dõi yêu cầu nạp tiền" description="Danh sách dưới đây lấy từ TopupRequest và thể hiện đúng trạng thái hiện có trong database." />
      <SectionCard title="Yêu cầu nạp tiền" description="Bạn có thể dùng seed data để kiểm tra các trạng thái chờ duyệt và đã duyệt.">
        <div className="space-y-3">
          {topups.length === 0 ? (
            <p className="text-sm text-muted-foreground">Chưa có yêu cầu nạp tiền nào.</p>
          ) : (
            topups.map((item) => (
              <div key={item.id} className="rounded-2xl border border-border/70 bg-background p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-medium text-foreground">{formatCurrency(item.amount)}</p>
                    <p className="text-sm text-muted-foreground">{item.bankReference ?? "Chưa có mã đối soát"} • {item.transferContent ?? "Chưa có nội dung chuyển khoản"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={mapStatusToBadge(item.status)} />
                    <p className="text-sm text-muted-foreground">{getStatusLabel(item.status)}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{item.note ?? "Chưa có ghi chú bổ sung."}</p>
                {item.reviewedBy ? <p className="mt-2 text-sm text-muted-foreground">Người xử lý: {item.reviewedBy.fullName}</p> : null}
              </div>
            ))
          )}
        </div>
      </SectionCard>
    </div>
  );
}
