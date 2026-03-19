import Link from "next/link";

import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { marketingNav } from "@/lib/constants/navigation";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="container flex h-18 items-center justify-between gap-4 py-4">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          {marketingNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted-foreground transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link href="/auth/sign-in">Đăng nhập</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/auth/sign-up">Bắt đầu</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
