import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthAlert } from "@/components/auth/auth-alert";
import { AuthFormShell } from "@/components/auth/auth-form-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCurrentUser, signUpAction } from "@/lib/auth";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string; success?: string }>;
}) {
  const user = await getCurrentUser();

  if (user) {
    redirect(user.role === "ADMIN" ? "/admin" : "/dashboard");
  }

  const params = (await searchParams) ?? {};

  return (
    <div className="container max-w-2xl space-y-8 py-10 md:py-16">
      <PageHeader
        eyebrow="Tạo tài khoản"
        title="Khởi tạo tài khoản mới"
        description="Sau khi đăng ký, hệ thống sẽ tạo ví mặc định và mở quyền truy cập khu vực làm việc của người dùng ngay lập tức."
      />
      <AuthFormShell badge="Đăng ký" title="Tạo tài khoản" description="Biểu mẫu này đã kết nối với auth email/password và session phía server.">
        <AuthAlert message={params.error} />
        <AuthAlert message={params.success} variant="success" />
        <form action={signUpAction} className="grid gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="fullName">
              Họ và tên
            </label>
            <Input id="fullName" name="fullName" placeholder="Nguyễn Văn A" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="email">
              Email
            </label>
            <Input id="email" name="email" type="email" placeholder="ban@vidu.com" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="phone">
              Số điện thoại
            </label>
            <Input id="phone" name="phone" placeholder="0900000000" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="password">
              Mật khẩu
            </label>
            <Input id="password" name="password" type="password" placeholder="Tối thiểu 8 ký tự" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="confirmPassword">
              Xác nhận mật khẩu
            </label>
            <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" required />
          </div>
          <Button type="submit" className="w-full">
            Tạo tài khoản
          </Button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground">
          Đã có tài khoản? <Link href="/auth/sign-in" className="font-medium text-primary">Đăng nhập</Link>
        </p>
      </AuthFormShell>
    </div>
  );
}
