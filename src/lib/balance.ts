import { BalanceMutationType, Prisma } from "@prisma/client";

type Tx = Prisma.TransactionClient;

export async function mutateBalance(
  tx: Tx,
  input: {
    userId: string;
    amount: number | Prisma.Decimal;
    type: BalanceMutationType;
    referenceId?: string;
    description: string;
  }
) {
  const user = await tx.user.findUniqueOrThrow({
    where: { id: input.userId },
    select: { balance: true }
  });
  const amount = new Prisma.Decimal(input.amount);
  const balanceBefore = user.balance;
  const balanceAfter = balanceBefore.plus(amount);

  if (balanceAfter.lessThan(0)) {
    throw new Error("INSUFFICIENT_BALANCE");
  }

  const updated = await tx.user.update({
    where: { id: input.userId },
    data: { balance: balanceAfter },
    select: { balance: true }
  });

  await tx.balanceMutation.create({
    data: {
      userId: input.userId,
      type: input.type,
      amount,
      balanceBefore,
      balanceAfter,
      referenceId: input.referenceId,
      description: input.description
    }
  });

  return updated;
}
