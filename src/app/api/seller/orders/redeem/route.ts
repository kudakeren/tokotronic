import { NextResponse } from "next/server";
import { requireSeller } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const seller = await requireSeller();
    const { redeemCode } = await request.json();
    if (!redeemCode || typeof redeemCode !== "string") {
      return NextResponse.json({ message: "Kode voucher wajib diisi" }, { status: 400 });
    }

    const order = await prisma.voucherOrder.findUnique({ where: { redeemCode } });
    if (!order || order.sellerId !== seller.id) {
      return NextResponse.json({ message: "Kode voucher tidak ditemukan" }, { status: 404 });
    }
    if (order.status !== "PAID") {
      return NextResponse.json({ message: "Voucher sudah tidak aktif" }, { status: 409 });
    }

    const updated = await prisma.voucherOrder.update({
      where: { id: order.id },
      data: { status: "REDEEMED", redeemedAt: new Date() }
    });

    return NextResponse.json({ order: updated });
  } catch (error) {
    return NextResponse.json({ message: "Gagal redeem voucher", error: `${error}` }, { status: 400 });
  }
}
