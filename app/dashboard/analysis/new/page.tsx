import { DisclaimerBlock } from "@/components/shared/disclaimer-block";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { requireUser } from "@/lib/auth";
import { formatCurrency, getAnalysisPageData, getStatusLabel, mapStatusToBadge } from "@/lib/db/dashboard";
import { APP_CONFIG } from "@/lib/config/app";

export default async function DashboardAnalysisNewPage() {
  const user = await requireUser();
  const analyses = await getAnalysisPageData(user.id);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Phân tích"
        title="Yêu cầu phân tích và kết quả gần đây"
        description="Khu vực này đã nối vào AnalysisRequest, AnalysisResult và SignatureFile để bạn kiểm tra dữ liệu thật từ seed."
      />
      <SectionCard title="Hai hình thức hiện có" description="Bảng giá được đọc từ cấu hình trung tâm của ứng dụng.">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border/70 bg-background p-5">
            <p className="font-semibold text-foreground">Phân tích bằng AI</p>
            <p className="mt-2 text-sm text-muted-foreground">{formatCurrency(APP_CONFIG.AI_ANALYSIS_PRICE)} / lượt • mức tham chiếu tối đa {APP_CONFIG.AI_MAX_REFERENCE_ACCURACY}%</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-background p-5">
            <p className="font-semibold text-foreground">Trò chuyện qua Zoom cùng Đặng Ngọc Hiếu</p>
            <p className="mt-2 text-sm text-muted-foreground">{formatCurrency(APP_CONFIG.HIEU_ZOOM_PRICE)} / lượt • mức tham chiếu tối đa {APP_CONFIG.HIEU_ZOOM_MAX_REFERENCE_ACCURACY}%</p>
          </div>
        </div>
      </SectionCard>
      <SectionCard title="Yêu cầu đã có" description="Danh sách yêu cầu phân tích hiện có của tài khoản.">
        <div className="space-y-3">
          {analyses.length === 0 ? (
            <p className="text-sm text-muted-foreground">Chưa có yêu cầu phân tích nào.</p>
          ) : (
            analyses.map((item) => (
              <div key={item.id} className="rounded-2xl border border-border/70 bg-background p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.serviceType === "AI" ? "Phân tích bằng AI" : "Trò chuyện qua Zoom"} • {formatCurrency(item.amountCharged)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={mapStatusToBadge(item.status)} />
                    <p className="text-sm text-muted-foreground">{getStatusLabel(item.status)}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.note ?? "Chưa có ghi chú bổ sung."}</p>
                {item.result ? <p className="mt-3 rounded-2xl bg-secondary px-4 py-3 text-sm text-muted-foreground">{item.result.summary}</p> : null}
              </div>
            ))
          )}
        </div>
      </SectionCard>
      <DisclaimerBlock />
    </div>
  );
}
