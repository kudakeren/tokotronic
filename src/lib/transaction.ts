import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { mutateBalance } from "@/lib/balance";
import { createInvoice } from "@/lib/invoice";
import { USER_STARTING_BALANCE } from "@/lib/starting-balance";
import { makeCode } from "@/lib/utils";

function serialFor(productName: string, categoryName: string) {
  const needsSerial = /token|voucher|game|pln/i.test(`${productName} ${categoryName}`);
  if (!needsSerial) return null;
  return Array.from({ length: 20 }, () => Math.floor(Math.random() * 10)).join("");
}

export async function createPpobTransaction(input: {
  userId: string;
  productId: string;
  customerNumber: string;
  customerName?: string;
}) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUniqueOrThrow({ where: { id: input.userId } });
    if (user.status === "SUSPENDED") throw new Error("USER_SUSPENDED");

    const product = await tx.product.findUniqueOrThrow({
      where: { id: input.productId },
      include: { category: true }
    });
    if (!product.isActive || !product.category.isActive) throw new Error("PRODUCT_INACTIVE");

    const totalAmount = product.sellPrice.plus(product.adminFee);
    const effectiveBalance = user.balance.lessThan(totalAmount) ? USER_STARTING_BALANCE : user.balance;
    if (user.balance.lessThan(totalAmount)) {
      await tx.user.update({
        where: { id: input.userId },
        data: { balance: effectiveBalance }
      });
    }

    const transaction = await tx.transaction.create({
      data: {
        userId: input.userId,
        productId: product.id,
        transactionNumber: makeCode("TRX"),
        customerNumber: input.customerNumber,
        customerName: input.customerName,
        productName: product.name,
        categoryName: product.category.name,
        price: product.sellPrice,
        adminFee: product.adminFee,
        totalAmount,
        status: "PENDING"
      }
    });

    await mutateBalance(tx, {
      userId: input.userId,
      amount: totalAmount.negated(),
      type: "TRANSACTION",
      referenceId: transaction.id,
      description: `Pembayaran ${product.name}`
    });

    const providerSuccess = Math.random() > 0.08;
    if (!providerSuccess) {
      await tx.transaction.update({
        where: { id: transaction.id },
        data: { status: "FAILED", notes: "Provider menolak transaksi dummy" }
      });
      await mutateBalance(tx, {
        userId: input.userId,
        amount: totalAmount,
        type: "REFUND",
        referenceId: transaction.id,
        description: `Refund ${product.name}`
      });
      throw new Error("PROVIDER_FAILED_REFUNDED");
    }

    const serialNumber = serialFor(product.name, product.category.name);
    const paidAt = new Date();
    const updated = await tx.transaction.update({
      where: { id: transaction.id },
      data: { status: "SUCCESS", serialNumber, paidAt }
    });

    const invoice = await createInvoice(tx, {
      userId: input.userId,
      transactionId: transaction.id,
      subtotal: product.sellPrice,
      adminFee: product.adminFee,
      total: totalAmount,
      status: "PAID",
      paidAt
    });

    await tx.transaction.update({
      where: { id: transaction.id },
      data: { invoiceId: invoice.id }
    });

    if (user.referredById) {
      const commissionAmount = totalAmount.mul(new Prisma.Decimal(0.01));
      await tx.commission.create({
        data: {
          userId: user.referredById,
          transactionId: transaction.id,
          amount: commissionAmount,
          status: "PENDING"
        }
      });
      await mutateBalance(tx, {
        userId: user.referredById,
        amount: commissionAmount,
        type: "COMMISSION",
        referenceId: transaction.id,
        description: `Komisi referral ${transaction.transactionNumber}`
      });
    }

    return { transaction: updated, invoice };
  });
}
