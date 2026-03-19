import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthAlert } from "@/components/auth/auth-alert";
import { AuthFormShell } from "@/components/auth/auth-form-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCurrentUser, signInAction } from "@/lib/auth";

export default async function SignInPage({
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
        eyebrow="Đăng nhập"
        title="Truy cập tài khoản của bạn"
        description="Đăng nhập bằng email và mật khẩu để quản lý ví, yêu cầu phân tích, lịch hẹn và khu vực quản trị nếu được phân quyền."
      />
      <AuthFormShell badge="Đăng nhập an toàn" title="Đăng nhập" description="Nếu bạn đã có tài khoản mẫu hoặc tài khoản tự tạo, hãy đăng nhập tại đây.">
        <AuthAlert message={params.error} />
        <AuthAlert message={params.success} variant="success" />
        <form action={signInAction} className="grid gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="email">
              Email
            </label>
            <Input id="email" name="email" type="email" placeholder="ban@vidu.com" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="password">
              Mật khẩu
            </label>
            <Input id="password" name="password" type="password" placeholder="Tối thiểu 8 ký tự" required />
          </div>
          <Button type="submit" className="w-full">
            Đăng nhập
          </Button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground">
          Chưa có tài khoản? <Link href="/auth/sign-up" className="font-medium text-primary">Tạo tài khoản mới</Link>
        </p>
      </AuthFormShell>
    </div>
  );
}
