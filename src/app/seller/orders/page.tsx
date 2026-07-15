import { RedeemVoucherForm } from "@/components/vouchers/redeem-voucher-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireSeller } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate, formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function SellerOrdersPage() {
  const seller = await requireSeller();
  const orders = await prisma.voucherOrder.findMany({
    where: { sellerId: seller.id },
    include: { buyer: true },
    orderBy: { createdAt: "desc" },
    take: 100
  });
  return (
    <DashboardShell title="Pesanan Voucher" seller>
      <div className="grid gap-6">
        <Card className="glass-card">
          <CardHeader><CardTitle>Redeem kode customer</CardTitle></CardHeader>
          <CardContent><RedeemVoucherForm /></CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader><CardTitle>Daftar pesanan</CardTitle></CardHeader>
          <CardContent className="grid gap-3">
            {orders.map((order) => (
              <div key={order.id} className="rounded-xl border bg-background p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="break-words font-black">{order.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{order.buyer.name} - {order.buyer.phone}</p>
                    <p className="mt-2 break-all font-mono text-xs">{order.redeemCode}</p>
                  </div>
                  <div className="shrink-0 sm:text-right">
                    <Badge>{order.status}</Badge>
                    <p className="mt-2 font-black text-rose-600">{formatRupiah(order.price)}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
