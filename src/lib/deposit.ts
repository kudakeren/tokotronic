import { prisma } from "@/lib/prisma";
import { mutateBalance } from "@/lib/balance";
import { createInvoice } from "@/lib/invoice";
import { makeCode } from "@/lib/utils";

export async function createDeposit(input: {
  userId: string;
  method: "BANK_TRANSFER" | "QRIS" | "VIRTUAL_ACCOUNT";
  amount: number;
}) {
  return prisma.$transaction(async (tx) => {
    const deposit = await tx.deposit.create({
      data: {
        userId: input.userId,
        method: input.method,
        amount: input.amount,
        depositNumber: makeCode("DEP"),
        status: "PENDING"
      }
    });

    const invoice = await createInvoice(tx, {
      userId: input.userId,
      depositId: deposit.id,
      subtotal: input.amount,
      adminFee: 0,
      total: input.amount,
      status: "UNPAID"
    });

    return { deposit, invoice };
  });
}

export async function approveDeposit(input: { depositId: string; adminId: string }) {
  return prisma.$transaction(async (tx) => {
    const deposit = await tx.deposit.findUniqueOrThrow({
      where: { id: input.depositId },
      include: { invoices: true }
    });
    if (deposit.status !== "PENDING") return deposit;

    const approvedAt = new Date();
    await mutateBalance(tx, {
      userId: deposit.userId,
      amount: deposit.amount,
      type: "DEPOSIT",
      referenceId: deposit.id,
      description: `Deposit ${deposit.depositNumber} disetujui`
    });

    await tx.invoice.updateMany({
      where: { depositId: deposit.id },
      data: { status: "PAID", paidAt: approvedAt }
    });

    return tx.deposit.update({
      where: { id: deposit.id },
      data: {
        status: "SUCCESS",
        approvedById: input.adminId,
        approvedAt
      }
    });
  });
}
