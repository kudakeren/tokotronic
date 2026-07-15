import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  await requireAdmin();
  return NextResponse.json(await prisma.commission.findMany({ include: { user: true, transaction: true }, orderBy: { createdAt: "desc" } }));
}
