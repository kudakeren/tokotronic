import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const user = await requireUser();
  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id },
    include: { transaction: true, deposit: true, user: { select: { id: true, name: true, email: true, phone: true } } }
  });
  if (!invoice) return NextResponse.json({ message: "Invoice tidak ditemukan" }, { status: 404 });
  if (user.role !== "ADMIN" && invoice.userId !== user.id) {
    return NextResponse.json({ message: "Tidak diizinkan" }, { status: 403 });
  }
  return NextResponse.json(invoice);
}
