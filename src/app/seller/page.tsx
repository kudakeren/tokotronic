import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireSeller } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function SellerDashboardPage() {
  const seller = await requireSeller();
  const [user, voucherCount, orders, pendingOrders] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: seller.id }, include: { sellerProfile: true } }),
    prisma.foodVoucher.count({ where: { sellerId: seller.id } }),
    prisma.voucherOrder.findMany({ where: { sellerId: seller.id }, orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.voucherOrder.count({ where: { sellerId: seller.id, status: "PAID" } })
  ]);
  const revenue = orders.reduce((sum, order) => sum + Number(order.price), 0);

  return (
    <DashboardShell title={`Seller ${user.sellerProfile?.storeName ?? user.name}`} seller>
      <div className="grid gap-6">
        <Card className="overflow-hidden border-0 bg-slate-950 text-white shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <p className="text-sm font-bold text-white/70">Status toko</p>
            <h2 className="mt-2 text-3xl font-black tracking-normal">{user.sellerProfile?.status}</h2>
            <p className="mt-3 max-w-2xl text-white/78">Kelola stok, pesanan, dan listing gadget dari dashboard seller.</p>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Saldo seller" value={formatRupiah(user.balance)} />
          <StatCard title="Voucher aktif" value={voucherCount} tone="red" />
          <StatCard title="Pesanan baru" value={pendingOrders} tone="zinc" />
          <StatCard title="Penjualan terbaru" value={formatRupiah(revenue)} tone="slate" />
        </div>
        <Card className="border bg-white shadow-sm dark:bg-slate-950">
          <CardHeader><CardTitle>Pesanan voucher terbaru</CardTitle></CardHeader>
          <CardContent className="grid gap-3">
            {orders.length === 0 ? <p className="text-sm text-muted-foreground">Belum ada pesanan voucher.</p> : orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between gap-3 rounded-xl border p-4">
                <div className="min-w-0">
                  <p className="truncate font-bold">{order.title}</p>
                  <p className="break-all text-xs text-muted-foreground">{order.redeemCode}</p>
                </div>
                <p className="shrink-0 font-black text-red-600">{formatRupiah(order.price)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
