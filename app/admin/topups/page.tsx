import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCurrency, getAdminTopupsPageData, getStatusLabel, mapStatusToBadge } from "@/lib/db/dashboard";

export default async function AdminTopupsPage() {
  const topups = await getAdminTopupsPageData();

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Quản trị / Nạp tiền" title="Duyệt yêu cầu nạp tiền" description="Dữ liệu thật từ TopupRequest, User và Wallet để kiểm tra quyền quản trị." />
      <SectionCard title="Danh sách yêu cầu" description="Các trạng thái mẫu gồm chờ duyệt và đã duyệt.">
        <div className="space-y-3">
          {topups.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border/70 bg-background p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium text-foreground">{item.user.fullName} • {formatCurrency(item.amount)}</p>
                  <p className="text-sm text-muted-foreground">{item.user.email} • {item.bankReference ?? "Chưa có mã đối soát"}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={mapStatusToBadge(item.status)} />
                  <p className="text-sm text-muted-foreground">{getStatusLabel(item.status)}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{item.note ?? "Chưa có ghi chú."}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.reviewedBy ? `Đã xử lý bởi ${item.reviewedBy.fullName}.` : "Chưa có người xử lý."}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
