import { UserRole } from "@prisma/client";

export function isAdmin(role: UserRole) {
  return role === UserRole.ADMIN;
}

export function canAccessAdmin(role: UserRole) {
  return isAdmin(role);
}

export function canManageWallet(role: UserRole) {
  return role === UserRole.ADMIN || role === UserRole.USER;
}
