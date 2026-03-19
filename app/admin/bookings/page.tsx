import { DashboardPageTemplate } from "@/components/shared/dashboard-page";

export default function AdminBookingsPage() {
  return (
    <DashboardPageTemplate
      eyebrow="Admin / Lịch hẹn"
      title="Điều phối lịch trao đổi"
      description="Sẵn sàng để quản lý time slots, xác nhận cuộc hẹn và cập nhật link Zoom cho người dùng."
      highlights={[
        { label: "Yêu cầu mới", value: "0" },
        { label: "Đã xác nhận", value: "0" },
        { label: "Hoàn tất", value: "0" },
      ]}
      emptyTitle="Chưa có lịch hẹn nào"
      emptyDescription="Danh sách lịch hẹn và thao tác xác nhận sẽ được gắn vào workflow booking ở bước tiếp theo."
    />
  );
}
