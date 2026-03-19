import { DashboardPageTemplate } from "@/components/shared/dashboard-page";

export default function AdminUsersPage() {
  return (
    <DashboardPageTemplate
      eyebrow="Admin / Người dùng"
      title="Quản lý người dùng"
      description="Sẵn sàng cho danh sách tài khoản, tìm kiếm, phân quyền và lịch sử hoạt động."
      highlights={[
        { label: "Tổng tài khoản", value: "0" },
        { label: "Đang hoạt động", value: "0" },
        { label: "Admin", value: "0" },
      ]}
      emptyTitle="Chưa có dữ liệu người dùng"
      emptyDescription="Bảng người dùng, bộ lọc và thao tác quản trị sẽ được nối dữ liệu ở bước phát triển tiếp theo."
    />
  );
}
