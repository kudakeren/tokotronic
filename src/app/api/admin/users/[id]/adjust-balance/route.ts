import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { mutateBalance } from "@/lib/balance";
import { adjustBalanceSchema } from "@/lib/validations";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  await requireAdmin();
  const data = adjustBalanceSchema.parse(await request.json());
  const result = await prisma.$transaction((tx) =>
    mutateBalance(tx, {
      userId: params.id,
      amount: data.amount,
      type: "ADJUSTMENT",
      description: data.note
    })
  );
  return NextResponse.json(result);
}
