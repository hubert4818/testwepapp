import { APP_CONFIG } from "@/lib/config/app";

export const servicePackages = [
  {
    name: "Phân tích bằng AI",
    description: "Nhận phân tích nhanh, có cấu trúc rõ ràng để tham khảo trước khi cần trao đổi sâu hơn.",
    price: APP_CONFIG.AI_ANALYSIS_PRICE,
    maxAccuracy: APP_CONFIG.AI_MAX_REFERENCE_ACCURACY,
    cta: "Tạo phân tích mới",
  },
  {
    name: "Trò chuyện qua Zoom cùng Đặng Ngọc Hiếu",
    description: "Buổi trao đổi trực tiếp giúp làm rõ thêm bối cảnh, câu hỏi và hướng đọc chữ ký phù hợp.",
    price: APP_CONFIG.HIEU_ZOOM_PRICE,
    maxAccuracy: APP_CONFIG.HIEU_ZOOM_MAX_REFERENCE_ACCURACY,
    upsellPrice: APP_CONFIG.HIEU_ZOOM_UPSELL_PRICE,
    cta: "Đặt lịch trao đổi",
  },
] as const;

export const landingStats = [
  { label: "Gói tham khảo AI", value: "50.000đ", description: "mỗi lượt phân tích" },
  { label: "Trao đổi Zoom", value: "200.000đ", description: "mỗi buổi làm việc" },
  { label: "Mức tham chiếu tối đa", value: "95%", description: "cho hình thức Zoom" },
];
