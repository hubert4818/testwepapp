import { DashboardPageTemplate } from "@/components/shared/dashboard-page";

export default function DashboardTopupPage() {
  return (
    <DashboardPageTemplate
      eyebrow="Nạp tiền"
      title="Tạo và theo dõi yêu cầu nạp tiền"
      description="Luồng topup được chuẩn bị cho bước upload minh chứng, đối soát thủ công hoặc tự động và kiểm tra trạng thái."
      highlights={[
        { label: "Yêu cầu mới", value: "0" },
        { label: "Đang chờ xử lý", value: "0" },
        { label: "Đã xác nhận", value: "0" },
      ]}
      emptyTitle="Chưa có yêu cầu nạp tiền"
      emptyDescription="Bạn có thể tạo yêu cầu mới, xem trạng thái duyệt và quản lý minh chứng chuyển khoản tại đây."
      actionLabel="Tạo yêu cầu mới"
    />
  );
}
