import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { USER_STARTING_BALANCE } from "@/lib/starting-balance";
import { buyVoucherSchema } from "@/lib/validations";
import { makeCode } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = await request.json();
    const data = buyVoucherSchema.parse(body);

    const order = await prisma.$transaction(async (tx) => {
      const buyer = await tx.user.findUniqueOrThrow({ where: { id: user.id } });
      const voucher = await tx.foodVoucher.findUniqueOrThrow({
        where: { id: data.voucherId },
        include: { seller: true }
      });

      if (!voucher.isActive || voucher.stock <= 0 || voucher.validUntil < new Date()) {
        throw new Error("VOUCHER_NOT_AVAILABLE");
      }

      const price = new Prisma.Decimal(voucher.price);
      const effectiveBalance = new Prisma.Decimal(buyer.balance).lt(price) ? USER_STARTING_BALANCE : new Prisma.Decimal(buyer.balance);
      if (new Prisma.Decimal(buyer.balance).lt(price)) {
        await tx.user.update({
          where: { id: buyer.id },
          data: { balance: effectiveBalance }
        });
      }

      const orderNumber = makeCode("FVO");
      const redeemCode = makeCode("MEAL");
      await tx.user.update({
        where: { id: buyer.id },
        data: { balance: { decrement: price } }
      });
      await tx.user.update({
        where: { id: voucher.sellerId },
        data: { balance: { increment: price } }
      });
      await tx.foodVoucher.update({
        where: { id: voucher.id },
        data: { stock: { decrement: 1 } }
      });
      await tx.balanceMutation.create({
        data: {
          userId: buyer.id,
          type: "TRANSACTION",
          amount: price.negated(),
          balanceBefore: effectiveBalance,
          balanceAfter: effectiveBalance.minus(price),
          referenceId: orderNumber,
          description: `Beli Voucher Belanja ${voucher.title}`
        }
      });
      await tx.balanceMutation.create({
        data: {
          userId: voucher.sellerId,
          type: "VOUCHER_SALE",
          amount: price,
          balanceBefore: voucher.seller.balance,
          balanceAfter: new Prisma.Decimal(voucher.seller.balance).plus(price),
          referenceId: orderNumber,
          description: `Penjualan Voucher Belanja ${voucher.title}`
        }
      });

      return tx.voucherOrder.create({
        data: {
          buyerId: buyer.id,
          sellerId: voucher.sellerId,
          voucherId: voucher.id,
          orderNumber,
          redeemCode,
          title: voucher.title,
          price
        }
      });
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    const detail = `${error}`;
    const message = detail.includes("INSUFFICIENT_BALANCE")
      ? "Saldo tidak cukup"
      : detail.includes("VOUCHER_NOT_AVAILABLE")
        ? "Voucher tidak tersedia"
        : "Gagal membeli voucher";
    return NextResponse.json({ message, error: detail }, { status: detail.includes("UNAUTHORIZED") ? 401 : 400 });
  }
}
