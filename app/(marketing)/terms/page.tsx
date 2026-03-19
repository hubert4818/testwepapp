import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";

export default function TermsPage() {
  return (
    <div className="container space-y-8 py-10 md:py-16">
      <PageHeader eyebrow="Điều khoản" title="Điều khoản sử dụng bản MVP" description="Nội dung ngắn gọn để đặt nền cho các chính sách chi tiết ở giai đoạn tiếp theo." />
      <SectionCard title="Phạm vi dịch vụ" description="Mọi nội dung hiện tại được thiết kế như dịch vụ tham khảo và có thể cập nhật khi MVP phát triển.">
        <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
          <li>• Người dùng cần cung cấp thông tin trung thực khi gửi yêu cầu phân tích hoặc đặt lịch.</li>
          <li>• Hệ thống có thể điều chỉnh quy trình vận hành, bảng giá và thời gian phản hồi để phù hợp giai đoạn MVP.</li>
          <li>• Kết quả hiển thị trong hệ thống không phải văn bản giám định hay kết luận pháp lý.</li>
        </ul>
      </SectionCard>
    </div>
  );
}
