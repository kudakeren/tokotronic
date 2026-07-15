import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { approveDeposit } from "@/lib/deposit";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  const deposit = await approveDeposit({ depositId: params.id, adminId: admin.id });
  return NextResponse.json(deposit);
}
