import { DisclaimerBlock } from "@/components/shared/disclaimer-block";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { APP_CONFIG } from "@/lib/config/app";

export default function PricingPage() {
  return (
    <div className="container space-y-8 py-10 md:py-16">
      <PageHeader
        eyebrow="Bảng giá"
        title="Hai hình thức dịch vụ minh bạch"
        description="Mức phí hiện tại được cấu hình tập trung để dễ điều chỉnh trong quá trình vận hành MVP."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Phân tích bằng AI" description="Phù hợp khi cần phản hồi nhanh, có cấu trúc rõ ràng để tham khảo.">
          <div className="space-y-2 text-sm leading-6 text-muted-foreground">
            <p>Giá: <span className="font-semibold text-foreground">{APP_CONFIG.AI_ANALYSIS_PRICE.toLocaleString("vi-VN")}đ/lượt</span></p>
            <p>Mức tham chiếu tối đa: <span className="font-semibold text-foreground">{APP_CONFIG.AI_MAX_REFERENCE_ACCURACY}%</span></p>
          </div>
        </SectionCard>
        <SectionCard title="Trò chuyện qua Zoom cùng Đặng Ngọc Hiếu" description="Phù hợp khi cần trao đổi thêm ngữ cảnh và câu hỏi chi tiết hơn.">
          <div className="space-y-2 text-sm leading-6 text-muted-foreground">
            <p>Giá: <span className="font-semibold text-foreground">{APP_CONFIG.HIEU_ZOOM_PRICE.toLocaleString("vi-VN")}đ/lượt</span></p>
            <p>Mức tham chiếu tối đa: <span className="font-semibold text-foreground">{APP_CONFIG.HIEU_ZOOM_MAX_REFERENCE_ACCURACY}%</span></p>
            <p>Gói mở rộng sau buổi trao đổi: <span className="font-semibold text-foreground">{APP_CONFIG.HIEU_ZOOM_UPSELL_PRICE.toLocaleString("vi-VN")}đ</span></p>
          </div>
        </SectionCard>
      </div>
      <DisclaimerBlock />
    </div>
  );
}
