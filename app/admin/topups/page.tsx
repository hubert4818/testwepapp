import { DashboardPageTemplate } from "@/components/shared/dashboard-page";

export default function AdminTopupsPage() {
  return (
    <DashboardPageTemplate
      eyebrow="Admin / Nạp tiền"
      title="Duyệt yêu cầu nạp tiền"
      description="Sẵn sàng cho quy trình kiểm tra chứng từ, xác nhận giao dịch và cập nhật số dư ví."
      highlights={[
        { label: "Chờ duyệt", value: "0" },
        { label: "Đã xác nhận", value: "0" },
        { label: "Bị từ chối", value: "0" },
      ]}
      emptyTitle="Chưa có yêu cầu nào"
      emptyDescription="Danh sách topup, ảnh minh chứng và thao tác duyệt sẽ xuất hiện khi tích hợp backend thực tế."
    />
  );
}
