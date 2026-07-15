import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  await requireAdmin();
  const [users, transactions, deposits, revenue, failed] = await Promise.all([
    prisma.user.count(),
    prisma.transaction.count(),
    prisma.deposit.count({ where: { status: "PENDING" } }),
    prisma.transaction.findMany({ where: { status: "SUCCESS" }, select: { adminFee: true, totalAmount: true } }),
    prisma.transaction.count({ where: { status: "FAILED" } })
  ]);
  return NextResponse.json({
    users,
    transactions,
    pendingDeposits: deposits,
    failedTransactions: failed,
    revenue: revenue.reduce((sum, trx) => sum + Number(trx.adminFee), 0),
    grossVolume: revenue.reduce((sum, trx) => sum + Number(trx.totalAmount), 0)
  });
}
