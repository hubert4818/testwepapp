"use server";

import { redirect } from "next/navigation";

import { APP_CONFIG } from "@/lib/config/app";
import { prisma } from "@/lib/db/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { clearSession, createSession, getCurrentUser } from "@/lib/auth/session";
import { signInSchema, signUpSchema } from "@/lib/validators/auth";

function getString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value : "";
}

export async function signUpAction(formData: FormData) {
  const parsed = signUpSchema.safeParse({
    fullName: getString(formData.get("fullName")),
    email: getString(formData.get("email")),
    phone: getString(formData.get("phone")),
    password: getString(formData.get("password")),
    confirmPassword: getString(formData.get("confirmPassword")),
  });

  if (!parsed.success) {
    redirect(`/auth/sign-up?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ.")}`);
  }

  const existingUser = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });

  if (existingUser) {
    redirect(`/auth/sign-up?error=${encodeURIComponent("Email đã tồn tại trong hệ thống.")}`);
  }

  const user = await prisma.user.create({
    data: {
      email: parsed.data.email.toLowerCase(),
      passwordHash: hashPassword(parsed.data.password),
      fullName: parsed.data.fullName,
      phone: parsed.data.phone,
      wallet: {
        create: {},
      },
    },
  });

  await prisma.auditLog.create({
    data: {
      targetUserId: user.id,
      entityType: "User",
      entityId: user.id,
      action: "SIGN_UP",
      description: `Tạo mới tài khoản ${user.email}.`,
    },
  });

  await createSession(user.id);
  redirect(`/dashboard?success=${encodeURIComponent("Đăng ký thành công.")}`);
}

export async function signInAction(formData: FormData) {
  const parsed = signInSchema.safeParse({
    email: getString(formData.get("email")),
    password: getString(formData.get("password")),
  });

  if (!parsed.success) {
    redirect(`/auth/sign-in?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ.")}`);
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });

  if (!user || !verifyPassword(parsed.data.password, user.passwordHash)) {
    redirect(`/auth/sign-in?error=${encodeURIComponent("Email hoặc mật khẩu không đúng.")}`);
  }

  if (!user.isActive) {
    redirect(`/auth/sign-in?error=${encodeURIComponent("Tài khoản hiện đang tạm khoá.")}`);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastSignedInAt: new Date() },
  });

  await prisma.auditLog.create({
    data: {
      actorUserId: user.id,
      targetUserId: user.id,
      entityType: "AuthSession",
      entityId: user.id,
      action: "SIGN_IN",
      description: `Người dùng ${user.email} đăng nhập thành công.`,
    },
  });

  await createSession(user.id);
  redirect(user.role === "ADMIN" ? `/admin?success=${encodeURIComponent("Đăng nhập thành công.")}` : `/dashboard?success=${encodeURIComponent("Đăng nhập thành công.")}`);
}

export async function signOutAction() {
  const user = await getCurrentUser();

  if (user) {
    await prisma.auditLog.create({
      data: {
        actorUserId: user.id,
        targetUserId: user.id,
        entityType: "AuthSession",
        entityId: user.id,
        action: "SIGN_OUT",
        description: `Người dùng ${user.email} đăng xuất.`,
      },
    });
  }

  await clearSession();
  redirect(`/?success=${encodeURIComponent(`Bạn đã đăng xuất khỏi ${APP_CONFIG.APP_NAME}.`)}`);
}
