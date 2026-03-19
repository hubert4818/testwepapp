import { AlertTriangle } from "lucide-react";

import { APP_CONFIG } from "@/lib/config/app";

export function DisclaimerBlock() {
  return (
    <div className="rounded-3xl border border-warning/30 bg-warning/10 p-6">
      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-warning/20 text-warning-foreground">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Lưu ý quan trọng</h3>
          <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
            <li>• Mọi nội dung chỉ mang tính tham khảo.</li>
            <li>• Không thay thế giám định, kết luận pháp lý, tư vấn chuyên môn chính thức.</li>
            <li>• Không dùng như công cụ xác thực danh tính hoặc kết luận pháp y.</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            Nếu cần hỗ trợ thêm, vui lòng liên hệ <span className="font-medium text-foreground">{APP_CONFIG.SUPPORT_EMAIL}</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
