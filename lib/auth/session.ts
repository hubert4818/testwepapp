import { createHash, randomBytes } from "node:crypto";

import { UserRole } from "@prisma/client";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { APP_CONFIG } from "@/lib/config/app";
import { prisma } from "@/lib/db/prisma";
import { canAccessAdmin } from "@/lib/permissions";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

type SessionUser = {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
};

export type CurrentSession = {
  id: string;
  user: SessionUser;
  expiresAt: Date;
} | null;

function getCookieName() {
  return APP_CONFIG.AUTH_SESSION_COOKIE_NAME;
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function getExpiryDate() {
  return new Date(Date.now() + APP_CONFIG.AUTH_SESSION_DAYS * DAY_IN_MS);
}

async function getRequestMetadata() {
  const headerStore = await headers();
  return {
    ipAddress: headerStore.get("x-forwarded-for") ?? headerStore.get("x-real-ip") ?? undefined,
    userAgent: headerStore.get("user-agent") ?? undefined,
  };
}

export async function createSession(userId: string) {
  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  const expiresAt = getExpiryDate();
  const metadata = await getRequestMetadata();

  await prisma.authSession.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
      ipAddress: metadata.ipAddress,
      userAgent: metadata.userAgent,
      lastSeenAt: new Date(),
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(getCookieName(), rawToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(getCookieName())?.value;

  if (rawToken) {
    await prisma.authSession.deleteMany({ where: { tokenHash: hashToken(rawToken) } });
  }

  cookieStore.delete(getCookieName());
}

export async function getCurrentSession(): Promise<CurrentSession> {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(getCookieName())?.value;

  if (!rawToken) {
    return null;
  }

  const session = await prisma.authSession.findUnique({
    where: { tokenHash: hashToken(rawToken) },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          fullName: true,
          role: true,
          isActive: true,
        },
      },
    },
  });

  if (!session || !session.user.isActive || session.expiresAt <= new Date()) {
    await prisma.authSession.deleteMany({ where: { tokenHash: hashToken(rawToken) } });
    cookieStore.delete(getCookieName());
    return null;
  }

  return {
    id: session.id,
    expiresAt: session.expiresAt,
    user: {
      id: session.user.id,
      email: session.user.email,
      fullName: session.user.fullName,
      role: session.user.role,
    },
  };
}

export async function getCurrentUser() {
  const session = await getCurrentSession();
  return session?.user ?? null;
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireUser();

  if (!canAccessAdmin(user.role)) {
    redirect("/dashboard");
  }

  return user;
}
