import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  await requireAdmin();
  const q = new URL(request.url).searchParams.get("q") ?? "";
  const users = await prisma.user.findMany({
    where: q ? { OR: [{ name: { contains: q, mode: "insensitive" } }, { email: { contains: q, mode: "insensitive" } }] } : undefined,
    select: { id: true, name: true, email: true, phone: true, role: true, status: true, balance: true, createdAt: true },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(users);
}
