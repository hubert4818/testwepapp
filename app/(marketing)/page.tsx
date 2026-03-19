import Link from "next/link";
import { ArrowRight, Banknote, CalendarClock, ShieldCheck, Sparkles } from "lucide-react";

import { DisclaimerBlock } from "@/components/shared/disclaimer-block";
import { InfoBanner } from "@/components/shared/info-banner";
import { SectionCard } from "@/components/shared/section-card";
import { StatsCard } from "@/components/shared/stats-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { APP_CONFIG } from "@/lib/config/app";
import { landingStats, servicePackages } from "@/lib/constants/site";

export default function HomePage() {
  return (
    <div className="container space-y-16 py-10 md:py-16">
      <section className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <Badge>Hạ tầng sẵn sàng cho MVP deploy trên Vercel</Badge>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              Phân tích chữ ký theo hướng tham khảo, rõ ràng và phù hợp để mở rộng thành sản phẩm thực tế.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Nền tảng được chuẩn bị để triển khai nhanh với Next.js App Router, Prisma, PostgreSQL và kiến trúc dễ mở rộng cho auth, ví, nạp tiền, phân tích, đặt lịch và quản trị.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/dashboard/analysis/new">
                Bắt đầu phân tích <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">Xem bảng giá</Link>
            </Button>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Đặng Ngọc Hiếu – một người chủ quán thích chia sẻ mọi thứ mình biết
          </p>
        </div>
        <SectionCard
          title="Hai hình thức dịch vụ"
          description="Thông tin giá và mức tham chiếu được cấu hình tập trung để dễ điều chỉnh sau này."
        >
          <div className="space-y-4">
            {servicePackages.map((item) => (
              <div key={item.name} className="rounded-2xl border border-border/70 bg-background p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-foreground">{item.name}</p>
                    <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="rounded-2xl bg-secondary px-4 py-3 text-right">
                    <p className="text-xl font-semibold text-foreground">{item.price.toLocaleString("vi-VN")}đ</p>
                    <p className="text-xs text-muted-foreground">mức tham chiếu tối đa {item.maxAccuracy}%</p>
                  </div>
                </div>
                {"upsellPrice" in item && item.upsellPrice ? (
                  <p className="mt-3 text-sm text-muted-foreground">Có thể bổ sung gói mở rộng hậu buổi trao đổi với mức phí {item.upsellPrice.toLocaleString("vi-VN")}đ.</p>
                ) : null}
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {landingStats.map((item) => (
          <StatsCard key={item.label} label={item.label} value={item.value} description={item.description} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <InfoBanner
          title="Phân tích bằng AI"
          description={`50.000đ/lượt — mức tham chiếu tối đa ${APP_CONFIG.AI_MAX_REFERENCE_ACCURACY}% — phù hợp khi cần phản hồi nhanh để tham khảo.`}
          icon={<Sparkles className="h-5 w-5" />}
        />
        <InfoBanner
          title="Trao đổi qua Zoom"
          description={`200.000đ/lượt — mức tham chiếu tối đa ${APP_CONFIG.HIEU_ZOOM_MAX_REFERENCE_ACCURACY}% — phù hợp khi cần nhiều ngữ cảnh hơn.`}
          icon={<CalendarClock className="h-5 w-5" />}
        />
        <InfoBanner
          title="Thanh toán minh bạch"
          description={`Thông tin chuyển khoản, prefix và hỗ trợ được cấu hình sẵn để đồng bộ giữa marketing và dashboard.`}
          icon={<Banknote className="h-5 w-5" />}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionCard
          title="Định hướng vận hành production-minded"
          description="Cấu trúc dự án chừa sẵn các abstraction để tích hợp auth provider, cổng thanh toán và external storage."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/70 bg-background p-5">
              <p className="font-semibold text-foreground">Kiến trúc module</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Tách sẵn khu marketing, dashboard người dùng và admin để phát triển song song.</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background p-5">
              <p className="font-semibold text-foreground">Không phụ thuộc local filesystem</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Đã có lớp abstraction cho external file storage phù hợp môi trường serverless.</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background p-5">
              <p className="font-semibold text-foreground">Prisma + PostgreSQL</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Schema ban đầu hỗ trợ user, ví, nạp tiền, phân tích và đặt lịch.</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background p-5">
              <p className="font-semibold text-foreground">UI tiếng Việt, responsive</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Phong cách sạch, premium nhẹ, dễ tin và sẵn sàng mở rộng design system.</p>
            </div>
          </div>
        </SectionCard>
        <div className="space-y-6">
          <InfoBanner
            title="Cam kết trải nghiệm rõ ràng"
            description="Thông tin gói dịch vụ, mức tham chiếu và luồng dashboard được thể hiện nhất quán để giảm nhầm lẫn cho người dùng mới."
            icon={<ShieldCheck className="h-5 w-5" />}
          />
          <DisclaimerBlock />
        </div>
      </section>
    </div>
  );
}
