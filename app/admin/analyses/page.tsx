import { DashboardPageTemplate } from "@/components/shared/dashboard-page";

export default function AdminAnalysesPage() {
  return (
    <DashboardPageTemplate
      eyebrow="Admin / Phân tích"
      title="Theo dõi yêu cầu phân tích"
      description="Chuẩn bị sẵn cho queue phân tích, trạng thái xử lý, kết quả và kiểm soát chất lượng nội dung."
      highlights={[
        { label: "Nháp", value: "0" },
        { label: "Đang xử lý", value: "0" },
        { label: "Hoàn tất", value: "0" },
      ]}
      emptyTitle="Chưa có yêu cầu phân tích"
      emptyDescription="Khi module analysis được hoàn thiện, admin có thể xem danh sách, chi tiết và trạng thái xử lý tại đây."
    />
  );
}
