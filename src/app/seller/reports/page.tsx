import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireSeller } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/utils";

export default async function SellerReportsPage() {
  const seller = await requireSeller();
  const orders = await prisma.voucherOrder.findMany({ where: { sellerId: seller.id } });
  const revenue = orders.reduce((sum, order) => sum + Number(order.price), 0);
  return (
    <DashboardShell title="Laporan Seller" seller>
      <Card className="glass-card">
        <CardHeader><CardTitle>Ringkasan penjualan</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border p-4"><p className="text-sm text-muted-foreground">Total order</p><p className="mt-2 text-2xl font-black">{orders.length}</p></div>
          <div className="rounded-xl border p-4"><p className="text-sm text-muted-foreground">Revenue</p><p className="mt-2 text-2xl font-black">{formatRupiah(revenue)}</p></div>
          <div className="rounded-xl border p-4"><p className="text-sm text-muted-foreground">Redeemed</p><p className="mt-2 text-2xl font-black">{orders.filter((order) => order.status === "REDEEMED").length}</p></div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
