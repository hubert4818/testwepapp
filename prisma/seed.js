const crypto = require("node:crypto");
const {
  PrismaClient,
  UserRole,
  TopupStatus,
  AnalysisStatus,
  AnalysisServiceType,
  BookingStatus,
  ReferenceType,
  WalletTransactionStatus,
  WalletTransactionType,
} = require("@prisma/client");

const prisma = new PrismaClient();

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "Admin@123456";
  const userPassword = process.env.SEED_USER_PASSWORD || "User@123456";

  await prisma.auditLog.deleteMany();
  await prisma.authSession.deleteMany();
  await prisma.walletTransaction.deleteMany();
  await prisma.zoomBooking.deleteMany();
  await prisma.analysisResult.deleteMany();
  await prisma.signatureFile.deleteMany();
  await prisma.analysisRequest.deleteMany();
  await prisma.topupRequest.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      email: "admin@chuky.local",
      passwordHash: hashPassword(adminPassword),
      fullName: "Quản trị hệ thống",
      phone: "0900000001",
      role: UserRole.ADMIN,
      wallet: { create: { balance: 350000 } },
    },
    include: { wallet: true },
  });

  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "linh@chuky.local",
        passwordHash: hashPassword(userPassword),
        fullName: "Nguyễn Thu Linh",
        phone: "0900000002",
        role: UserRole.USER,
        wallet: { create: { balance: 120000 } },
      },
      include: { wallet: true },
    }),
    prisma.user.create({
      data: {
        email: "khanh@chuky.local",
        passwordHash: hashPassword(userPassword),
        fullName: "Trần Minh Khánh",
        phone: "0900000003",
        role: UserRole.USER,
        wallet: { create: { balance: 260000 } },
      },
      include: { wallet: true },
    }),
  ]);

  const [linh, khanh] = users;

  const linhTopupApproved = await prisma.topupRequest.create({
    data: {
      userId: linh.id,
      walletId: linh.wallet.id,
      amount: 200000,
      bankReference: "VCB-LINH-001",
      transferContent: "CKY LINH 001",
      note: "Đã đối soát thành công.",
      status: TopupStatus.APPROVED,
      reviewedAt: new Date(),
      reviewedById: admin.id,
    },
  });

  const khanhTopupPending = await prisma.topupRequest.create({
    data: {
      userId: khanh.id,
      walletId: khanh.wallet.id,
      amount: 100000,
      bankReference: "VCB-KHANH-001",
      transferContent: "CKY KHANH 001",
      note: "Chờ kiểm tra nội dung chuyển khoản.",
      status: TopupStatus.PENDING,
    },
  });

  const linhAiAnalysis = await prisma.analysisRequest.create({
    data: {
      userId: linh.id,
      serviceType: AnalysisServiceType.AI,
      status: AnalysisStatus.COMPLETED,
      title: "Phân tích chữ ký hồ sơ ứng tuyển",
      note: "Người dùng muốn xem nét ký có ổn định giữa 2 mẫu gần nhất hay không.",
      referenceAccuracyCap: 85,
      amountCharged: 50000,
      completedAt: new Date(),
    },
  });

  const khanhZoomAnalysis = await prisma.analysisRequest.create({
    data: {
      userId: khanh.id,
      serviceType: AnalysisServiceType.ZOOM,
      status: AnalysisStatus.PROCESSING,
      title: "Yêu cầu trao đổi trực tiếp về chữ ký hợp đồng",
      note: "Đặng Ngọc Hiếu – một người chủ quán thích chia sẻ mọi thứ mình biết",
      referenceAccuracyCap: 95,
      amountCharged: 200000,
    },
  });

  await prisma.signatureFile.createMany({
    data: [
      {
        userId: linh.id,
        analysisRequestId: linhAiAnalysis.id,
        referenceType: ReferenceType.SIGNATURE_SAMPLE,
        storageProvider: "seed-storage",
        storageKey: "seed/linh/signature-01.png",
        fileName: "linh-chu-ky-01.png",
        mimeType: "image/png",
        fileSize: 245000,
        publicUrl: "https://cdn.example.com/seed/linh/signature-01.png",
      },
      {
        userId: khanh.id,
        analysisRequestId: khanhZoomAnalysis.id,
        referenceType: ReferenceType.COMPARISON_SAMPLE,
        storageProvider: "seed-storage",
        storageKey: "seed/khanh/signature-02.png",
        fileName: "khanh-chu-ky-02.png",
        mimeType: "image/png",
        fileSize: 265000,
        publicUrl: "https://cdn.example.com/seed/khanh/signature-02.png",
      },
    ],
  });

  await prisma.analysisResult.create({
    data: {
      analysisRequestId: linhAiAnalysis.id,
      createdById: admin.id,
      summary: "Mẫu chữ ký có độ ổn định khá tốt về nhịp nét và điểm dừng, phù hợp để tham khảo ở mức cơ bản.",
      detailedMarkdown: `- Nét đầu và nét kết có nhịp tương đối đều.
- Độ đè bút chưa cho thấy chênh lệch lớn giữa các mẫu.
- Khuyến nghị người dùng tiếp tục đối chiếu thêm trong các tình huống quan trọng.`,
      confidenceScore: 81,
      referenceAccuracy: 83,
    },
  });

  const khanhBooking = await prisma.zoomBooking.create({
    data: {
      userId: khanh.id,
      analysisRequestId: khanhZoomAnalysis.id,
      status: BookingStatus.CONFIRMED,
      scheduledAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
      durationMinutes: 45,
      meetingUrl: "https://zoom.us/j/123456789",
      contactEmail: khanh.email,
      note: "Đặng Ngọc Hiếu – một người chủ quán thích chia sẻ mọi thứ mình biết",
      amountCharged: 200000,
      confirmedById: admin.id,
      confirmedAt: new Date(),
    },
  });

  await prisma.walletTransaction.createMany({
    data: [
      {
        walletId: linh.wallet.id,
        userId: linh.id,
        type: WalletTransactionType.TOPUP,
        status: WalletTransactionStatus.COMPLETED,
        amount: 200000,
        balanceBefore: 0,
        balanceAfter: 200000,
        description: "Nạp tiền thành công qua chuyển khoản.",
        referenceCode: "WTX-LINH-001",
        topupRequestId: linhTopupApproved.id,
        processedAt: new Date(),
      },
      {
        walletId: linh.wallet.id,
        userId: linh.id,
        type: WalletTransactionType.ANALYSIS_PAYMENT,
        status: WalletTransactionStatus.COMPLETED,
        amount: -50000,
        balanceBefore: 200000,
        balanceAfter: 150000,
        description: "Thanh toán gói Phân tích bằng AI.",
        referenceCode: "WTX-LINH-002",
        analysisRequestId: linhAiAnalysis.id,
        processedAt: new Date(),
      },
      {
        walletId: khanh.wallet.id,
        userId: khanh.id,
        type: WalletTransactionType.BOOKING_PAYMENT,
        status: WalletTransactionStatus.COMPLETED,
        amount: -200000,
        balanceBefore: 460000,
        balanceAfter: 260000,
        description: "Thanh toán lịch trao đổi qua Zoom.",
        referenceCode: "WTX-KHANH-001",
        zoomBookingId: khanhBooking.id,
        analysisRequestId: khanhZoomAnalysis.id,
        processedAt: new Date(),
      },
      {
        walletId: khanh.wallet.id,
        userId: khanh.id,
        type: WalletTransactionType.TOPUP,
        status: WalletTransactionStatus.PENDING,
        amount: 100000,
        balanceBefore: 260000,
        balanceAfter: 260000,
        description: "Yêu cầu nạp tiền đang chờ duyệt.",
        referenceCode: "WTX-KHANH-002",
        topupRequestId: khanhTopupPending.id,
      },
    ],
  });

  await prisma.wallet.update({ where: { id: linh.wallet.id }, data: { balance: 150000 } });
  await prisma.wallet.update({ where: { id: khanh.wallet.id }, data: { balance: 260000 } });

  await prisma.auditLog.createMany({
    data: [
      {
        actorUserId: admin.id,
        targetUserId: linh.id,
        entityType: "TopupRequest",
        entityId: linhTopupApproved.id,
        action: "APPROVE_TOPUP",
        description: "Duyệt yêu cầu nạp tiền của người dùng Nguyễn Thu Linh.",
      },
      {
        actorUserId: admin.id,
        targetUserId: khanh.id,
        entityType: "ZoomBooking",
        entityId: khanhBooking.id,
        action: "CONFIRM_BOOKING",
        description: "Xác nhận lịch trao đổi qua Zoom cho Trần Minh Khánh.",
      },
      {
        actorUserId: admin.id,
        targetUserId: linh.id,
        entityType: "AnalysisResult",
        entityId: linhAiAnalysis.id,
        action: "CREATE_ANALYSIS_RESULT",
        description: "Tạo kết quả phân tích tham khảo cho yêu cầu AI của Nguyễn Thu Linh.",
      },
    ],
  });

  console.log("Seed hoàn tất.");
  console.table([
    { role: "ADMIN", email: admin.email, password: adminPassword },
    { role: "USER", email: linh.email, password: userPassword },
    { role: "USER", email: khanh.email, password: userPassword },
  ]);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
