import { DashboardPageTemplate } from "@/components/shared/dashboard-page";
import { DisclaimerBlock } from "@/components/shared/disclaimer-block";

export default function DashboardAnalysisNewPage() {
  return (
    <DashboardPageTemplate
      eyebrow="Phân tích"
      title="Khởi tạo yêu cầu phân tích mới"
      description="Skeleton đã chừa chỗ cho upload file qua external storage, form zod và xử lý job bất đồng bộ."
      highlights={[
        { label: "Gói AI", value: "50.000đ" },
        { label: "Gói Zoom", value: "200.000đ" },
        { label: "Ảnh tham chiếu tối đa", value: "5" },
      ]}
      emptyTitle="Chưa có dữ liệu đầu vào"
      emptyDescription="Bước tiếp theo có thể nối upload presigned URL, validator zod và hàng đợi xử lý phân tích."
      actionLabel="Tạo yêu cầu"
      secondary={<DisclaimerBlock />}
    />
  );
}
