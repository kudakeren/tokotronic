import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? undefined;
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      category: { slug: category, isActive: true },
      OR: q ? [{ name: { contains: q, mode: "insensitive" } }, { providerName: { contains: q, mode: "insensitive" } }] : undefined
    },
    include: { category: true },
    orderBy: [{ category: { name: "asc" } }, { sellPrice: "asc" }]
  });
  return NextResponse.json(products);
}
