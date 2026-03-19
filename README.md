# Phân Tích Chữ Ký MVP

MVP production-minded cho dịch vụ phân tích chữ ký, định hướng deploy trên Vercel với Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Prisma, PostgreSQL và zod.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui foundation
- Prisma + PostgreSQL
- zod
- Email/password authentication với session lưu trong database

## Những phần đã scaffold xong

- Landing page tiếng Việt theo phong cách sạch, premium nhẹ và responsive.
- Authentication email/password gồm đăng ký, đăng nhập, đăng xuất, session helper và route protection cơ bản.
- Role `USER` và `ADMIN`, cùng server-side guard cho toàn bộ khu vực `/admin`.
- Dashboard người dùng và admin dùng dữ liệu thật từ database.
- Bộ reusable UI components: `page header`, `stats card`, `section card`, `empty state`, `status badge`, `info banner`, `disclaimer block`.
- Prisma schema đầy đủ cho các model: `User`, `Wallet`, `WalletTransaction`, `TopupRequest`, `SignatureFile`, `AnalysisRequest`, `AnalysisResult`, `ZoomBooking`, `AuditLog`, `AuthSession`.
- Seed data gồm 1 admin, 2 user, wallet, transactions, topup, analysis, booking và audit log.
- Abstraction cho external file storage để phù hợp môi trường Vercel/serverless.

## Cách chạy local

### 1. Cài dependencies

```bash
pnpm install
```

### 2. Tạo file môi trường

```bash
cp .env.example .env
```

Cập nhật `DATABASE_URL` trỏ tới PostgreSQL local hoặc cloud của bạn.

### 3. Generate Prisma Client

```bash
pnpm prisma:generate
```

### 4. Chạy migration

```bash
pnpm prisma:migrate
```

### 5. Seed dữ liệu mẫu

```bash
pnpm prisma:seed
```

### 6. Chạy ứng dụng

```bash
pnpm dev
```

Ứng dụng mặc định chạy tại `http://localhost:3000`.

## Tài khoản seed mặc định

- Admin: `admin@chuky.local` / `Admin@123456`
- User: `linh@chuky.local` / `User@123456`
- User: `khanh@chuky.local` / `User@123456`

Bạn có thể đổi mật khẩu seed qua biến môi trường `SEED_ADMIN_PASSWORD` và `SEED_USER_PASSWORD` trước khi chạy seed.

## Prisma schema

Schema hiện tại nằm tại `prisma/schema.prisma` và đã chuẩn bị các nhóm dữ liệu cốt lõi:

- Authentication + session
- Wallet + wallet transactions
- Topup requests
- Signature files
- Analysis requests + results
- Zoom bookings
- Audit logs

## Định hướng mở rộng tiếp theo

- Bổ sung form tạo phân tích mới và upload file thật qua external storage adapter.
- Thêm server actions / route handlers cho topup, booking và các thao tác admin.
- Tích hợp email notification, audit chi tiết hơn và monitoring.
- Bổ sung test tự động khi môi trường cho phép cài dependencies đầy đủ.
