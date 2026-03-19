import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { getWalletPageData, formatCurrency, getStatusLabel, mapStatusToBadge } from "@/lib/db/dashboard";
import { requireUser } from "@/lib/auth";

export default async function DashboardWalletPage() {
  const user = await requireUser();
  const wallet = await getWalletPageData(user.id);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Ví" title="Quản lý số dư và giao dịch" description="Trang ví đang đọc dữ liệu thật từ bảng Wallet, WalletTransaction và TopupRequest." />
      <SectionCard title="Thông tin ví" description="Mỗi người dùng có một ví mặc định để theo dõi số dư và các khoản chi trả dịch vụ.">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border/70 bg-background p-4">
            <p className="text-sm text-muted-foreground">Số dư</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{formatCurrency(wallet?.balance)}</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-background p-4">
            <p className="text-sm text-muted-foreground">Đơn vị tiền tệ</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{wallet?.currency ?? "VND"}</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-background p-4">
            <p className="text-sm text-muted-foreground">Số giao dịch gần đây</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{wallet?.transactions.length ?? 0}</p>
          </div>
        </div>
      </SectionCard>
      <SectionCard title="Lịch sử giao dịch" description="Hiển thị 10 giao dịch ví gần nhất.">
        <div className="space-y-3">
          {wallet?.transactions.length ? (
            wallet.transactions.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-background p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium text-foreground">{item.description ?? item.type}</p>
                  <p className="text-sm text-muted-foreground">{getStatusLabel(item.type)} • {new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeStyle: "short" }).format(item.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={mapStatusToBadge(item.status)} />
                  <p className="font-semibold text-foreground">{formatCurrency(item.amount)}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Chưa có giao dịch nào trong ví.</p>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
