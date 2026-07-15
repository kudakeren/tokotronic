import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createPpobTransaction } from "@/lib/transaction";
import { createTransactionSchema } from "@/lib/validations";

export async function GET() {
  const user = await requireUser();
  const where = user.role === "ADMIN" ? {} : { userId: user.id };
  const transactions = await prisma.transaction.findMany({
    where,
    include: { invoices: true },
    orderBy: { createdAt: "desc" },
    take: 100
  });
  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const data = createTransactionSchema.parse(await request.json());
    const result = await createPpobTransaction({ ...data, userId: user.id });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const message = `${error}`;
    const status = message.includes("INSUFFICIENT") ? 402 : message.includes("SUSPENDED") ? 403 : 400;
    return NextResponse.json({ message }, { status });
  }
}
