import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { providerSchema } from "@/lib/validations";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  await requireAdmin();
  const data = providerSchema.partial().parse(await request.json());
  return NextResponse.json(await prisma.provider.update({ where: { id: params.id }, data }));
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await requireAdmin();
  await prisma.provider.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
