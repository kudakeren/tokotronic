import { InvoiceStatus, Prisma } from "@prisma/client";
import { makeCode } from "@/lib/utils";

type Tx = Prisma.TransactionClient;

export async function createInvoice(
  tx: Tx,
  input: {
    userId: string;
    transactionId?: string;
    depositId?: string;
    subtotal: Prisma.Decimal | number;
    adminFee: Prisma.Decimal | number;
    total: Prisma.Decimal | number;
    status?: InvoiceStatus;
    paidAt?: Date;
  }
) {
  return tx.invoice.create({
    data: {
      invoiceNumber: makeCode("INV"),
      userId: input.userId,
      transactionId: input.transactionId,
      depositId: input.depositId,
      subtotal: input.subtotal,
      adminFee: input.adminFee,
      total: input.total,
      status: input.status ?? "UNPAID",
      paidAt: input.paidAt
    }
  });
}
