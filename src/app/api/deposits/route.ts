import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { createDeposit } from "@/lib/deposit";
import { prisma } from "@/lib/prisma";
import { createDepositSchema } from "@/lib/validations";

export async function GET() {
  const user = await requireUser();
  const where = user.role === "ADMIN" ? {} : { userId: user.id };
  const deposits = await prisma.deposit.findMany({ where, orderBy: { createdAt: "desc" }, take: 100 });
  return NextResponse.json(deposits);
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const data = createDepositSchema.parse(await request.json());
    const result = await createDeposit({ userId: user.id, method: data.method, amount: data.amount });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 400 });
  }
}
