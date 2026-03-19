import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <div className="container max-w-2xl space-y-8 py-10 md:py-16">
      <PageHeader eyebrow="Đăng nhập" title="Truy cập tài khoản của bạn" description="Skeleton giao diện đăng nhập đã sẵn sàng để kết nối auth provider hoặc credentials flow." />
      <SectionCard title="Đăng nhập" description="Bước này mới dựng khung giao diện và chưa nối business logic thực tế.">
        <div className="grid gap-4">
          <div className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm text-muted-foreground">Email</div>
          <div className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm text-muted-foreground">Mật khẩu</div>
          <Button className="w-full">Tiếp tục</Button>
        </div>
      </SectionCard>
    </div>
  );
}
