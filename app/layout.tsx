import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

import { APP_CONFIG } from "@/lib/config/app";

export const metadata: Metadata = {
  title: {
    default: APP_CONFIG.APP_NAME,
    template: `%s | ${APP_CONFIG.APP_NAME}`,
  },
  description: "MVP production-minded cho dịch vụ phân tích chữ ký với AI và trao đổi qua Zoom.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
