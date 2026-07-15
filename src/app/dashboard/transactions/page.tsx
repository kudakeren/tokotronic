import { DashboardShell } from "@/components/layout/dashboard-shell";
import { TransactionTable } from "@/components/transaction/transaction-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate, formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function TransactionsPage() {
  const user = await requireUser();
  const [transactions, voucherOrders] = await Promise.all([
    prisma.transaction.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.voucherOrder.findMany({ where: { buyerId: user.id }, include: { seller: { include: { sellerProfile: true } } }, orderBy: { createdAt: "desc" }, take: 50 })
  ]);
  return (
    <DashboardShell title="Riwayat Transaksi">
      <div className="grid gap-6">
        <Card className="glass-card">
          <CardHeader><CardTitle>Voucher Belanja saya</CardTitle></CardHeader>
          <CardContent className="grid gap-3">
            {voucherOrders.length === 0 ? (
              <p className="text-sm text-muted-foreground">Belum ada Voucher Belanja.</p>
            ) : voucherOrders.map((order) => (
              <div key={order.id} className="rounded-xl border bg-background p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="break-words font-black">{order.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{order.seller.sellerProfile?.storeName ?? "Seller"}</p>
                    <p className="mt-2 break-all rounded-lg bg-rose-500/10 px-3 py-2 font-mono text-sm font-bold text-rose-700 dark:text-rose-300">Kode: {order.redeemCode}</p>
                  </div>
                  <div className="shrink-0 text-left sm:text-right">
                    <Badge>{order.status}</Badge>
                    <p className="mt-2 font-black text-rose-600">{formatRupiah(order.price)}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader><CardTitle>Semua transaksi PPOB</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-4"><Input placeholder="Search" /><Input placeholder="Filter status" /><Input placeholder="Filter layanan" /><Input type="date" /></div>
            <TransactionTable transactions={transactions} />
            <p className="text-sm text-muted-foreground">Menampilkan 50 transaksi terbaru.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
