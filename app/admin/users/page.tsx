import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCurrency, getAdminUsersPageData, getRoleLabel } from "@/lib/db/dashboard";

export default async function AdminUsersPage() {
  const users = await getAdminUsersPageData();

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Quản trị / Người dùng" title="Quản lý tài khoản" description="Danh sách tài khoản được lấy từ bảng User và Wallet, giúp test nhanh vai trò USER/ADMIN." />
      <SectionCard title="Danh sách người dùng" description="Seed hiện có 1 admin và 2 người dùng thường.">
        <div className="space-y-3">
          {users.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border/70 bg-background p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium text-foreground">{item.fullName}</p>
                  <p className="text-sm text-muted-foreground">{item.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={item.role === "ADMIN" ? "active" : "completed"} />
                  <p className="text-sm text-muted-foreground">{getRoleLabel(item.role)}</p>
                </div>
              </div>
              <div className="mt-3 grid gap-3 text-sm text-muted-foreground md:grid-cols-4">
                <p>Số dư ví: <span className="font-medium text-foreground">{formatCurrency(item.wallet?.balance)}</span></p>
                <p>Phân tích: <span className="font-medium text-foreground">{item._count.analysisRequests}</span></p>
                <p>Lịch hẹn: <span className="font-medium text-foreground">{item._count.zoomBookings}</span></p>
                <p>Nạp tiền: <span className="font-medium text-foreground">{item._count.topupRequests}</span></p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
