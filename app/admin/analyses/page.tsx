import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCurrency, getAdminAnalysesPageData, getStatusLabel, mapStatusToBadge } from "@/lib/db/dashboard";

export default async function AdminAnalysesPage() {
  const analyses = await getAdminAnalysesPageData();

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Quản trị / Phân tích" title="Theo dõi yêu cầu phân tích" description="Trang quản trị này lấy dữ liệu thật từ AnalysisRequest, AnalysisResult, SignatureFile và ZoomBooking." />
      <SectionCard title="Danh sách yêu cầu" description="Có sẵn dữ liệu AI và Zoom để test nhanh toàn bộ flow quản trị.">
        <div className="space-y-3">
          {analyses.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border/70 bg-background p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.user.fullName} • {item.serviceType === "AI" ? "Phân tích bằng AI" : "Trò chuyện qua Zoom"}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={mapStatusToBadge(item.status)} />
                  <p className="font-semibold text-foreground">{formatCurrency(item.amountCharged)}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{item.note ?? "Chưa có ghi chú."}</p>
              <p className="mt-2 text-sm text-muted-foreground">Số file tham chiếu: {item.files.length} • Số booking liên quan: {item.zoomBookings.length}</p>
              {item.result ? <p className="mt-3 rounded-2xl bg-secondary px-4 py-3 text-sm text-muted-foreground">{item.result.summary}</p> : <p className="mt-3 text-sm text-muted-foreground">{getStatusLabel(item.status)}</p>}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
