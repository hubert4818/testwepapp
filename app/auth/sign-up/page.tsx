import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  return (
    <div className="container max-w-2xl space-y-8 py-10 md:py-16">
      <PageHeader eyebrow="Tạo tài khoản" title="Khởi tạo tài khoản mới" description="Skeleton đăng ký đã sẵn sàng để kết nối xác thực, profile và onboarding sau này." />
      <SectionCard title="Đăng ký" description="Luồng form sẽ được nối với auth module ở bước tiếp theo.">
        <div className="grid gap-4">
          <div className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm text-muted-foreground">Họ và tên</div>
          <div className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm text-muted-foreground">Email</div>
          <div className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm text-muted-foreground">Số điện thoại</div>
          <div className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm text-muted-foreground">Mật khẩu</div>
          <Button className="w-full">Tạo tài khoản</Button>
        </div>
      </SectionCard>
    </div>
  );
}
