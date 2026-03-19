import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatsCard } from "@/components/shared/stats-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { getUserDashboardOverview, formatCurrency, getStatusLabel, mapStatusToBadge } from "@/lib/db/dashboard";
import { requireUser } from "@/lib/auth";

export default async function DashboardHomePage() {
  const user = await requireUser();
  const data = await getUserDashboardOverview(user.id);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Tổng quan"
        title={`Xin chào ${user.fullName}`}
        description="Dữ liệu dưới đây đang đọc trực tiếp từ database để bạn kiểm tra nhanh ví, yêu cầu phân tích và các giao dịch gần đây."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard label="Số dư ví" value={formatCurrency(data.wallet?.balance)} description="Số dư khả dụng hiện tại trong ví." />
        <StatsCard label="Yêu cầu phân tích" value={String(data.analysisCount)} description="Tổng số yêu cầu phân tích đã tạo." />
        <StatsCard label="Nạp tiền chờ duyệt" value={String(data.pendingTopups)} description="Số yêu cầu đang cần kiểm tra." />
      </div>
      <SectionCard title="Giao dịch gần đây" description="Các giao dịch ví mới nhất của tài khoản hiện tại.">
        <div className="space-y-3">
          {data.latestTransactions.length === 0 ? (
            <p className="text-sm text-muted-foreground">Chưa có giao dịch nào.</p>
          ) : (
            data.latestTransactions.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-background p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium text-foreground">{item.description ?? item.type}</p>
                  <p className="text-sm text-muted-foreground">{new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeStyle: "short" }).format(item.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={mapStatusToBadge(item.status)} />
                  <p className="font-semibold text-foreground">{formatCurrency(item.amount)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </SectionCard>
      <SectionCard title="Phân tích gần nhất" description="Các yêu cầu phân tích đã tạo cho tài khoản này.">
        <div className="space-y-3">
          {data.latestAnalyses.length === 0 ? (
            <p className="text-sm text-muted-foreground">Chưa có yêu cầu phân tích nào.</p>
          ) : (
            data.latestAnalyses.map((item) => (
              <div key={item.id} className="rounded-2xl border border-border/70 bg-background p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.serviceType === "AI" ? "Phân tích bằng AI" : "Trò chuyện qua Zoom"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={mapStatusToBadge(item.status)} />
                    <p className="text-sm text-muted-foreground">{getStatusLabel(item.status)}</p>
                  </div>
                </div>
                {item.result ? <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.result.summary}</p> : null}
              </div>
            ))
          )}
        </div>
      </SectionCard>
    </div>
  );
}
