import Link from "next/link";

import { APP_CONFIG } from "@/lib/config/app";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-tight text-foreground">
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
        CK
      </span>
      <span className="flex flex-col">
        <span>{APP_CONFIG.APP_NAME}</span>
        <span className="text-xs font-normal text-muted-foreground">Dịch vụ phân tích chữ ký tham khảo</span>
      </span>
    </Link>
  );
}
