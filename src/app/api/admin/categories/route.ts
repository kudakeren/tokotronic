import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/lib/validations";

export async function GET() {
  await requireAdmin();
  return NextResponse.json(await prisma.productCategory.findMany({ orderBy: { name: "asc" } }));
}

export async function POST(request: Request) {
  await requireAdmin();
  const data = categorySchema.parse(await request.json());
  return NextResponse.json(await prisma.productCategory.create({ data }), { status: 201 });
}
