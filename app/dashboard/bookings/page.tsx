import { DashboardPageTemplate } from "@/components/shared/dashboard-page";

export default function DashboardBookingsPage() {
  return (
    <DashboardPageTemplate
      eyebrow="Lịch hẹn"
      title="Quản lý lịch trao đổi qua Zoom"
      description="Module booking sẵn sàng để kết nối time slots, xác nhận lịch và link phòng họp."
      highlights={[
        { label: "Yêu cầu mới", value: "0" },
        { label: "Đã xác nhận", value: "0" },
        { label: "Hoàn tất", value: "0" },
      ]}
      emptyTitle="Chưa có lịch hẹn nào"
      emptyDescription="Khi booking module được triển khai, bạn sẽ theo dõi yêu cầu đặt lịch, thời gian và trạng thái buổi trao đổi tại đây."
      actionLabel="Đặt lịch mới"
    />
  );
}
