import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    const seller = await prisma.sellerProfile.update({
      where: { id: params.id },
      data: { status: "APPROVED", approvedAt: new Date(), rejectedAt: null }
    });
    return NextResponse.json({ seller });
  } catch (error) {
    return NextResponse.json({ message: "Gagal approve seller", error: `${error}` }, { status: 400 });
  }
}
