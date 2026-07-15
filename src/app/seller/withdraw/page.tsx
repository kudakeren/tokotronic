import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireSeller } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/utils";

export default async function SellerWithdrawPage() {
  const seller = await requireSeller();
  const user = await prisma.user.findUniqueOrThrow({ where: { id: seller.id } });
  return (
    <DashboardShell title="Penarikan Saldo" seller>
      <Card className="glass-card">
        <CardHeader><CardTitle>Saldo tersedia {formatRupiah(user.balance)}</CardTitle></CardHeader>
        <CardContent className="text-sm leading-6 text-muted-foreground">
          Form penarikan saldo seller disiapkan untuk integrasi settlement. Untuk versi awal saldo masih dummy.
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
