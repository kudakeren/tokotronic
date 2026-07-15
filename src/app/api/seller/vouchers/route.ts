import { NextResponse } from "next/server";
import { requireSeller } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createFoodVoucherSchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const user = await requireSeller();
    const seller = await prisma.user.findUnique({ where: { id: user.id }, include: { sellerProfile: true } });
    if (seller?.sellerProfile?.status !== "APPROVED") {
      return NextResponse.json({ message: "Seller belum di-approve admin" }, { status: 403 });
    }

    const data = createFoodVoucherSchema.parse(await request.json());
    const voucher = await prisma.foodVoucher.create({
      data: {
        sellerId: user.id,
        categoryId: data.categoryId,
        title: data.title,
        code: `${slugify(data.code)}-${Math.random().toString(36).slice(2, 6)}`.toUpperCase(),
        description: data.description,
        restaurant: data.restaurant,
        city: data.city,
        price: data.price,
        stock: data.stock,
        validUntil: data.validUntil,
        isActive: data.isActive ?? true
      }
    });

    return NextResponse.json({ voucher }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Gagal membuat voucher", error: `${error}` }, { status: 400 });
  }
}
