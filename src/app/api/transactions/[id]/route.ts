import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const user = await requireUser();
  const transaction = await prisma.transaction.findUnique({
    where: { id: params.id },
    include: { invoices: true, user: { select: { id: true, name: true, email: true } } }
  });
  if (!transaction) return NextResponse.json({ message: "Transaksi tidak ditemukan" }, { status: 404 });
  if (user.role !== "ADMIN" && transaction.userId !== user.id) {
    return NextResponse.json({ message: "Tidak diizinkan" }, { status: 403 });
  }
  return NextResponse.json(transaction);
}
