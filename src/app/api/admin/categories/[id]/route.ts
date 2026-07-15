import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/lib/validations";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  await requireAdmin();
  const data = categorySchema.partial().parse(await request.json());
  return NextResponse.json(await prisma.productCategory.update({ where: { id: params.id }, data }));
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await requireAdmin();
  await prisma.productCategory.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
