# Phân Tích Chữ Ký MVP

MVP production-minded cho dịch vụ phân tích chữ ký, định hướng deploy trên Vercel với Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Prisma, PostgreSQL và zod.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui foundation
- Prisma + PostgreSQL
- zod

## Tính năng scaffold sẵn

- Landing page tiếng Việt theo phong cách sạch, premium nhẹ và responsive.
- Route skeleton cho marketing, auth, dashboard người dùng và admin.
- Layout tách biệt cho public, user dashboard và admin.
- Bộ reusable UI components: `page header`, `stats card`, `section card`, `empty state`, `status badge`, `info banner`, `disclaimer block`.
- Prisma schema khởi đầu cho các module: `auth`, `wallet`, `topup`, `analysis`, `booking`, `admin`.
- Centralized app config để đổi giá, thông tin ngân hàng, email hỗ trợ và các hằng số nghiệp vụ.
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

### 4. Chạy ứng dụng

```bash
pnpm dev
```

Ứng dụng mặc định chạy tại `http://localhost:3000`.

## Prisma

Schema hiện tại nằm tại `prisma/schema.prisma` và đã chuẩn bị các model cơ bản:

- `User`
- `Analysis`
- `Topup`
- `Booking`

Khi sẵn sàng kết nối database thật, bạn có thể chạy migration:

```bash
pnpm prisma:migrate
```

## Định hướng mở rộng tiếp theo

- Kết nối auth thật bằng NextAuth/Auth.js hoặc provider phù hợp.
- Thêm server actions / route handlers cho wallet, topup, analysis, booking.
- Tích hợp external object storage bằng S3-compatible provider.
- Tích hợp payment reconciliation và admin moderation workflow.
- Bổ sung audit log, role guards và monitoring.
