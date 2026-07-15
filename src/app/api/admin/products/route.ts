import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";

export async function GET() {
  await requireAdmin();
  return NextResponse.json(await prisma.product.findMany({ include: { category: true, provider: true }, orderBy: { createdAt: "desc" } }));
}

export async function POST(request: Request) {
  await requireAdmin();
  const data = productSchema.parse(await request.json());
  const product = await prisma.product.create({ data });
  return NextResponse.json(product, { status: 201 });
}
