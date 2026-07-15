import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  await requireAdmin();
  const body = await request.json().catch(() => ({}));
  const deposit = await prisma.deposit.update({
    where: { id: params.id },
    data: { status: "FAILED", adminNote: body.adminNote ?? "Deposit ditolak admin" }
  });
  await prisma.invoice.updateMany({ where: { depositId: params.id }, data: { status: "CANCELLED" } });
  return NextResponse.json(deposit);
}
