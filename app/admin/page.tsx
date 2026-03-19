import { DashboardPageTemplate } from "@/components/shared/dashboard-page";
import { InfoBanner } from "@/components/shared/info-banner";

export default function AdminHomePage() {
  return (
    <DashboardPageTemplate
      eyebrow="Admin"
      title="Tổng quan vận hành nội bộ"
      description="Khu vực quản trị đã có cấu trúc để mở rộng báo cáo, moderation, duyệt nạp tiền và kiểm tra chất lượng dữ liệu."
      highlights={[
        { label: "Người dùng", value: "0" },
        { label: "Topup chờ duyệt", value: "0" },
        { label: "Phân tích mở", value: "0" },
      ]}
      emptyTitle="Chưa có dữ liệu vận hành"
      emptyDescription="Ở bước tiếp theo, trang này có thể hiển thị KPI, hàng chờ xử lý và cảnh báo vận hành theo thời gian thực."
      secondary={<InfoBanner title="Phân quyền admin" description="Layout và route admin đã được tách riêng để dễ bổ sung auth guard, audit log và role-based access control." />}
    />
  );
}
