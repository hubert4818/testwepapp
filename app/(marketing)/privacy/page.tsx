import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";

export default function PrivacyPage() {
  return (
    <div className="container space-y-8 py-10 md:py-16">
      <PageHeader eyebrow="Bảo mật" title="Định hướng bảo mật và dữ liệu" description="Tài liệu khởi đầu để chuẩn bị cho các chính sách lưu trữ, quyền truy cập và kiểm soát dữ liệu." />
      <SectionCard title="Nguyên tắc xử lý dữ liệu" description="Hệ thống được định hướng cho môi trường cloud và serverless, tránh phụ thuộc local filesystem lâu dài.">
        <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
          <li>• File tải lên sẽ được thiết kế để đi qua lớp external storage adapter ở bước triển khai tiếp theo.</li>
          <li>• Dữ liệu người dùng và giao dịch được định hướng lưu trong PostgreSQL thông qua Prisma.</li>
          <li>• Quyền truy cập theo vai trò người dùng và admin sẽ được bổ sung khi triển khai auth thực tế.</li>
        </ul>
      </SectionCard>
    </div>
  );
}
