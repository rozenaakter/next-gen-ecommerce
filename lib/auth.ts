// lib/auth.ts - REPLACE THIS ENTIRE FILE
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./auth/config";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return (session as any)?.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

// ✅ NEW: Admin check function
export async function requireAdmin() {
  const user = await requireAuth();
  
  if (user.role !== 'ADMIN') {
    redirect("/unauthorized");
  }
  return user;
}

// ✅ NEW: Check if user is admin
export function isAdmin(user: any) {
  return user?.role === 'ADMIN';
}

// ✅ NEW: Check if user is customer
export function isCustomer(user: any) {
  return user?.role === 'CUSTOMER';
}