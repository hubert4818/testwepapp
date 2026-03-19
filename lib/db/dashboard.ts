import { AnalysisStatus, BookingStatus, TopupStatus, UserRole, WalletTransactionStatus } from "@prisma/client";

import { prisma } from "@/lib/db/prisma";

export async function getUserDashboardOverview(userId: string) {
  const [wallet, analysisCount, bookingCount, pendingTopups, latestTransactions, latestAnalyses] = await Promise.all([
    prisma.wallet.findUnique({ where: { userId } }),
    prisma.analysisRequest.count({ where: { userId } }),
    prisma.zoomBooking.count({ where: { userId } }),
    prisma.topupRequest.count({ where: { userId, status: TopupStatus.PENDING } }),
    prisma.walletTransaction.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.analysisRequest.findMany({ where: { userId }, include: { result: true }, orderBy: { createdAt: "desc" }, take: 3 }),
  ]);

  return { wallet, analysisCount, bookingCount, pendingTopups, latestTransactions, latestAnalyses };
}

export async function getWalletPageData(userId: string) {
  return prisma.wallet.findUnique({
    where: { userId },
    include: {
      transactions: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      topupRequests: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });
}

export async function getTopupPageData(userId: string) {
  return prisma.topupRequest.findMany({
    where: { userId },
    include: {
      reviewedBy: {
        select: { id: true, fullName: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAnalysisPageData(userId: string) {
  return prisma.analysisRequest.findMany({
    where: { userId },
    include: {
      result: true,
      files: true,
      zoomBookings: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getBookingPageData(userId: string) {
  return prisma.zoomBooking.findMany({
    where: { userId },
    include: {
      analysisRequest: {
        select: { id: true, title: true, serviceType: true },
      },
      confirmedBy: {
        select: { id: true, fullName: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAdminDashboardData() {
  const [users, pendingTopups, activeAnalyses, bookings, recentAuditLogs] = await Promise.all([
    prisma.user.count(),
    prisma.topupRequest.count({ where: { status: TopupStatus.PENDING } }),
    prisma.analysisRequest.count({
      where: {
        status: {
          in: [AnalysisStatus.SUBMITTED, AnalysisStatus.PAID, AnalysisStatus.PROCESSING],
        },
      },
    }),
    prisma.zoomBooking.count({ where: { status: BookingStatus.CONFIRMED } }),
    prisma.auditLog.findMany({
      include: {
        actor: { select: { fullName: true, email: true } },
        target: { select: { fullName: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  return { users, pendingTopups, activeAnalyses, bookings, recentAuditLogs };
}

export async function getAdminUsersPageData() {
  return prisma.user.findMany({
    include: {
      wallet: true,
      _count: {
        select: {
          analysisRequests: true,
          zoomBookings: true,
          topupRequests: true,
        },
      },
    },
    orderBy: [{ role: "desc" }, { createdAt: "desc" }],
  });
}

export async function getAdminTopupsPageData() {
  return prisma.topupRequest.findMany({
    include: {
      user: { select: { id: true, fullName: true, email: true } },
      reviewedBy: { select: { id: true, fullName: true } },
      wallet: { select: { id: true, balance: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAdminAnalysesPageData() {
  return prisma.analysisRequest.findMany({
    include: {
      user: { select: { id: true, fullName: true, email: true } },
      result: true,
      files: true,
      zoomBookings: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAdminBookingsPageData() {
  return prisma.zoomBooking.findMany({
    include: {
      user: { select: { id: true, fullName: true, email: true } },
      confirmedBy: { select: { id: true, fullName: true } },
      analysisRequest: { select: { id: true, title: true, status: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getSeedAccountsSummary() {
  return prisma.user.findMany({
    where: {
      email: {
        in: ["admin@chuky.local", "linh@chuky.local", "khanh@chuky.local"],
      },
    },
    include: { wallet: true },
    orderBy: [{ role: "desc" }, { email: "asc" }],
  });
}

export function formatCurrency(amount: number | null | undefined) {
  return `${(amount ?? 0).toLocaleString("vi-VN")}đ`;
}

export function getStatusLabel(status: string) {
  const mapping: Record<string, string> = {
    PENDING: "Đang chờ",
    APPROVED: "Đã duyệt",
    REJECTED: "Từ chối",
    DRAFT: "Nháp",
    SUBMITTED: "Đã gửi",
    PAID: "Đã thanh toán",
    PROCESSING: "Đang xử lý",
    COMPLETED: "Hoàn tất",
    CANCELLED: "Đã huỷ",
    REQUESTED: "Đã yêu cầu",
    CONFIRMED: "Đã xác nhận",
    FAILED: "Thất bại",
    USER: "Người dùng",
    ADMIN: "Quản trị viên",
  };

  return mapping[status] ?? status;
}

export function mapStatusToBadge(status: string): "draft" | "pending" | "completed" | "cancelled" | "active" {
  if ([TopupStatus.PENDING, WalletTransactionStatus.PENDING, AnalysisStatus.SUBMITTED, AnalysisStatus.PROCESSING, BookingStatus.REQUESTED].includes(status as never)) {
    return "pending";
  }

  if ([TopupStatus.APPROVED, AnalysisStatus.COMPLETED, BookingStatus.CONFIRMED].includes(status as never)) {
    return "completed";
  }

  if ([TopupStatus.REJECTED, AnalysisStatus.CANCELLED, BookingStatus.CANCELLED, WalletTransactionStatus.FAILED, WalletTransactionStatus.CANCELLED].includes(status as never)) {
    return "cancelled";
  }

  if (status === AnalysisStatus.DRAFT) {
    return "draft";
  }

  return "active";
}

type SimpleRole = UserRole | string;

export function getRoleLabel(role: SimpleRole) {
  return role === UserRole.ADMIN ? "Quản trị viên" : "Người dùng";
}

export async function getSessionSnapshot(userId: string) {
  return prisma.authSession.findFirst({ where: { userId }, orderBy: { createdAt: "desc" } });
}
