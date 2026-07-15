import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await requireUser();
  const where = user.role === "ADMIN" ? {} : { userId: user.id };
  const [profile, total, success, pending, monthTransactions] = await Promise.all([
    prisma.user.findUnique({ where: { id: user.id }, select: { balance: true, name: true, referralCode: true } }),
    prisma.transaction.count({ where }),
    prisma.transaction.count({ where: { ...where, status: "SUCCESS" } }),
    prisma.transaction.count({ where: { ...where, status: "PENDING" } }),
    prisma.transaction.findMany({
      where: { ...where, createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } },
      select: { totalAmount: true }
    })
  ]);
  const spending = monthTransactions.reduce((sum, item) => sum + Number(item.totalAmount), 0);
  return NextResponse.json({ profile, total, success, pending, spending });
}
