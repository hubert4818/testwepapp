import Link from "next/link";

import { Logo } from "@/components/shared/logo";
import { APP_CONFIG } from "@/lib/config/app";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border/70 bg-card/50">
      <div className="container grid gap-8 py-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Nền tảng giúp bạn tiếp cận dịch vụ phân tích chữ ký theo hướng tham khảo, minh bạch và dễ triển khai trên hạ tầng hiện đại.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Điều hướng</p>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link href="/pricing">Bảng giá</Link>
            <Link href="/terms">Điều khoản</Link>
            <Link href="/privacy">Bảo mật</Link>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Hỗ trợ</p>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <a href={`mailto:${APP_CONFIG.SUPPORT_EMAIL}`}>{APP_CONFIG.SUPPORT_EMAIL}</a>
            <span>{APP_CONFIG.BANK_NAME}</span>
            <span>{APP_CONFIG.BANK_ACCOUNT_NUMBER}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
