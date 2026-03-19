import { DashboardPageTemplate } from "@/components/shared/dashboard-page";
import { InfoBanner } from "@/components/shared/info-banner";
import { APP_CONFIG } from "@/lib/config/app";

export default function DashboardWalletPage() {
  return (
    <DashboardPageTemplate
      eyebrow="Ví"
      title="Quản lý số dư và lịch sử ví"
      description="Module ví được scaffold để chuẩn bị cho số dư, ledger nội bộ, hoàn tiền và đối soát giao dịch."
      highlights={[
        { label: "Số dư khả dụng", value: "0đ" },
        { label: "Nạp tiền chờ duyệt", value: "0" },
        { label: "Mã chuyển khoản", value: APP_CONFIG.BANK_TRANSFER_PREFIX },
      ]}
      emptyTitle="Ví của bạn chưa có giao dịch"
      emptyDescription="Các giao dịch nạp tiền, sử dụng dịch vụ và hoàn tiền sẽ hiển thị ở đây sau khi kết nối dữ liệu thật."
      actionLabel="Tạo yêu cầu nạp tiền"
      secondary={<InfoBanner title="Thông tin chuyển khoản" description={`${APP_CONFIG.BANK_NAME} • ${APP_CONFIG.BANK_ACCOUNT_NUMBER} • ${APP_CONFIG.BANK_ACCOUNT_HOLDER}`} />}
    />
  );
}
