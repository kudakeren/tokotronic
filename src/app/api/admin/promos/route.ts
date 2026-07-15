import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { promoSchema } from "@/lib/validations";

export async function GET() {
  await requireAdmin();
  return NextResponse.json(await prisma.promo.findMany({ orderBy: { expiredAt: "asc" } }));
}

export async function POST(request: Request) {
  await requireAdmin();
  const data = promoSchema.parse(await request.json());
  return NextResponse.json(await prisma.promo.create({ data }), { status: 201 });
}
