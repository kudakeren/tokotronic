import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { providerSchema } from "@/lib/validations";

export async function GET() {
  await requireAdmin();
  return NextResponse.json(await prisma.provider.findMany({ orderBy: { priority: "asc" } }));
}

export async function POST(request: Request) {
  await requireAdmin();
  const data = providerSchema.parse(await request.json());
  return NextResponse.json(await prisma.provider.create({ data }), { status: 201 });
}
