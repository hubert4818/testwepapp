import { InfoBanner } from "@/components/shared/info-banner";
import { DashboardPageTemplate } from "@/components/shared/dashboard-page";

export default function DashboardHomePage() {
  return (
    <DashboardPageTemplate
      eyebrow="Dashboard"
      title="Không gian làm việc của người dùng"
      description="Khu vực tổng quan để theo dõi số dư, yêu cầu phân tích, lịch hẹn và trạng thái thanh toán."
      highlights={[
        { label: "Số dư ví", value: "0đ" },
        { label: "Phân tích đang xử lý", value: "0" },
        { label: "Lịch hẹn sắp tới", value: "0" },
      ]}
      emptyTitle="Chưa có hoạt động nào"
      emptyDescription="Khi business logic được kết nối, khu vực này sẽ hiển thị lịch sử giao dịch, phân tích gần đây và thông báo vận hành."
      actionLabel="Tạo phân tích mới"
      secondary={<InfoBanner title="MVP sẵn sàng mở rộng" description="Có thể gắn auth thật, database thật và payment workflow mà không cần thay đổi cấu trúc lớn." />}
    />
  );
}
