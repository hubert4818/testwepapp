CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');
CREATE TYPE "WalletTransactionType" AS ENUM ('TOPUP', 'ANALYSIS_PAYMENT', 'BOOKING_PAYMENT', 'REFUND', 'ADJUSTMENT');
CREATE TYPE "WalletTransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED');
CREATE TYPE "TopupStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE "AnalysisStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'PAID', 'PROCESSING', 'COMPLETED', 'CANCELLED');
CREATE TYPE "BookingStatus" AS ENUM ('REQUESTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED');
CREATE TYPE "ReferenceType" AS ENUM ('SIGNATURE_SAMPLE', 'HANDWRITING_SAMPLE', 'COMPARISON_SAMPLE', 'OTHER');
CREATE TYPE "AnalysisServiceType" AS ENUM ('AI', 'ZOOM');

CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "phone" TEXT,
  "role" "UserRole" NOT NULL DEFAULT 'USER',
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "lastSignedInAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AuthSession" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "lastSeenAt" TIMESTAMP(3),
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AuthSession_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Wallet" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "balance" INTEGER NOT NULL DEFAULT 0,
  "currency" TEXT NOT NULL DEFAULT 'VND',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TopupRequest" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "walletId" TEXT NOT NULL,
  "amount" INTEGER NOT NULL,
  "bankReference" TEXT,
  "transferContent" TEXT,
  "note" TEXT,
  "status" "TopupStatus" NOT NULL DEFAULT 'PENDING',
  "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "reviewedAt" TIMESTAMP(3),
  "reviewedById" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "TopupRequest_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AnalysisRequest" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "serviceType" "AnalysisServiceType" NOT NULL,
  "status" "AnalysisStatus" NOT NULL DEFAULT 'DRAFT',
  "title" TEXT NOT NULL,
  "note" TEXT,
  "referenceAccuracyCap" INTEGER NOT NULL,
  "amountCharged" INTEGER NOT NULL,
  "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "completedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AnalysisRequest_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SignatureFile" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "analysisRequestId" TEXT,
  "referenceType" "ReferenceType" NOT NULL,
  "storageProvider" TEXT NOT NULL,
  "storageKey" TEXT NOT NULL,
  "fileName" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "fileSize" INTEGER NOT NULL,
  "publicUrl" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "SignatureFile_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AnalysisResult" (
  "id" TEXT NOT NULL,
  "analysisRequestId" TEXT NOT NULL,
  "createdById" TEXT,
  "summary" TEXT NOT NULL,
  "detailedMarkdown" TEXT NOT NULL,
  "confidenceScore" INTEGER,
  "referenceAccuracy" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AnalysisResult_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ZoomBooking" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "analysisRequestId" TEXT,
  "status" "BookingStatus" NOT NULL DEFAULT 'REQUESTED',
  "scheduledAt" TIMESTAMP(3),
  "durationMinutes" INTEGER NOT NULL DEFAULT 45,
  "meetingUrl" TEXT,
  "contactEmail" TEXT,
  "note" TEXT,
  "amountCharged" INTEGER NOT NULL,
  "confirmedById" TEXT,
  "confirmedAt" TIMESTAMP(3),
  "completedAt" TIMESTAMP(3),
  "cancelledAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ZoomBooking_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "WalletTransaction" (
  "id" TEXT NOT NULL,
  "walletId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "type" "WalletTransactionType" NOT NULL,
  "status" "WalletTransactionStatus" NOT NULL DEFAULT 'COMPLETED',
  "amount" INTEGER NOT NULL,
  "balanceBefore" INTEGER NOT NULL,
  "balanceAfter" INTEGER NOT NULL,
  "description" TEXT,
  "referenceCode" TEXT,
  "metadata" JSONB,
  "topupRequestId" TEXT,
  "analysisRequestId" TEXT,
  "zoomBookingId" TEXT,
  "processedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "WalletTransaction_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AuditLog" (
  "id" TEXT NOT NULL,
  "actorUserId" TEXT,
  "targetUserId" TEXT,
  "entityType" TEXT NOT NULL,
  "entityId" TEXT NOT NULL,
  "action" TEXT NOT NULL,
  "description" TEXT,
  "metadata" JSONB,
  "ipAddress" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "AuthSession_tokenHash_key" ON "AuthSession"("tokenHash");
CREATE UNIQUE INDEX "Wallet_userId_key" ON "Wallet"("userId");
CREATE UNIQUE INDEX "AnalysisResult_analysisRequestId_key" ON "AnalysisResult"("analysisRequestId");
CREATE INDEX "AuthSession_userId_idx" ON "AuthSession"("userId");
CREATE INDEX "AuthSession_expiresAt_idx" ON "AuthSession"("expiresAt");
CREATE INDEX "WalletTransaction_walletId_createdAt_idx" ON "WalletTransaction"("walletId", "createdAt");
CREATE INDEX "WalletTransaction_userId_createdAt_idx" ON "WalletTransaction"("userId", "createdAt");
CREATE INDEX "WalletTransaction_topupRequestId_idx" ON "WalletTransaction"("topupRequestId");
CREATE INDEX "WalletTransaction_analysisRequestId_idx" ON "WalletTransaction"("analysisRequestId");
CREATE INDEX "WalletTransaction_zoomBookingId_idx" ON "WalletTransaction"("zoomBookingId");
CREATE INDEX "TopupRequest_userId_createdAt_idx" ON "TopupRequest"("userId", "createdAt");
CREATE INDEX "TopupRequest_status_createdAt_idx" ON "TopupRequest"("status", "createdAt");
CREATE INDEX "SignatureFile_userId_createdAt_idx" ON "SignatureFile"("userId", "createdAt");
CREATE INDEX "SignatureFile_analysisRequestId_idx" ON "SignatureFile"("analysisRequestId");
CREATE INDEX "AnalysisRequest_userId_createdAt_idx" ON "AnalysisRequest"("userId", "createdAt");
CREATE INDEX "AnalysisRequest_status_createdAt_idx" ON "AnalysisRequest"("status", "createdAt");
CREATE INDEX "ZoomBooking_userId_createdAt_idx" ON "ZoomBooking"("userId", "createdAt");
CREATE INDEX "ZoomBooking_status_createdAt_idx" ON "ZoomBooking"("status", "createdAt");
CREATE INDEX "AuditLog_entityType_entityId_createdAt_idx" ON "AuditLog"("entityType", "entityId", "createdAt");
CREATE INDEX "AuditLog_actorUserId_createdAt_idx" ON "AuditLog"("actorUserId", "createdAt");
CREATE INDEX "AuditLog_targetUserId_createdAt_idx" ON "AuditLog"("targetUserId", "createdAt");

ALTER TABLE "AuthSession" ADD CONSTRAINT "AuthSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TopupRequest" ADD CONSTRAINT "TopupRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TopupRequest" ADD CONSTRAINT "TopupRequest_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TopupRequest" ADD CONSTRAINT "TopupRequest_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SignatureFile" ADD CONSTRAINT "SignatureFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SignatureFile" ADD CONSTRAINT "SignatureFile_analysisRequestId_fkey" FOREIGN KEY ("analysisRequestId") REFERENCES "AnalysisRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "AnalysisRequest" ADD CONSTRAINT "AnalysisRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AnalysisResult" ADD CONSTRAINT "AnalysisResult_analysisRequestId_fkey" FOREIGN KEY ("analysisRequestId") REFERENCES "AnalysisRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AnalysisResult" ADD CONSTRAINT "AnalysisResult_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ZoomBooking" ADD CONSTRAINT "ZoomBooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ZoomBooking" ADD CONSTRAINT "ZoomBooking_analysisRequestId_fkey" FOREIGN KEY ("analysisRequestId") REFERENCES "AnalysisRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ZoomBooking" ADD CONSTRAINT "ZoomBooking_confirmedById_fkey" FOREIGN KEY ("confirmedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "WalletTransaction" ADD CONSTRAINT "WalletTransaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "WalletTransaction" ADD CONSTRAINT "WalletTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "WalletTransaction" ADD CONSTRAINT "WalletTransaction_topupRequestId_fkey" FOREIGN KEY ("topupRequestId") REFERENCES "TopupRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "WalletTransaction" ADD CONSTRAINT "WalletTransaction_analysisRequestId_fkey" FOREIGN KEY ("analysisRequestId") REFERENCES "AnalysisRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "WalletTransaction" ADD CONSTRAINT "WalletTransaction_zoomBookingId_fkey" FOREIGN KEY ("zoomBookingId") REFERENCES "ZoomBooking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
