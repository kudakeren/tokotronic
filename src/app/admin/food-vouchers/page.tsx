import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { formatDate, formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminFoodVouchersPage() {
  const vouchers = await prisma.foodVoucher.findMany({
    include: { seller: { include: { sellerProfile: true } }, category: true },
    orderBy: { createdAt: "desc" },
    take: 100
  });
  return (
    <DashboardShell title="CMS Voucher Belanja" admin>
      <Card className="glass-card">
        <CardHeader><CardTitle>Semua Voucher Belanja</CardTitle></CardHeader>
        <CardContent className="grid gap-3">
          {vouchers.map((voucher) => (
            <div key={voucher.id} className="rounded-xl border bg-background p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="break-words font-black">{voucher.title}</p>
                  <p className="text-sm text-muted-foreground">{voucher.seller.sellerProfile?.storeName} - {voucher.category.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Berlaku sampai {formatDate(voucher.validUntil)}</p>
                </div>
                <div className="shrink-0 sm:text-right">
                  <Badge>{voucher.isActive ? "ACTIVE" : "INACTIVE"}</Badge>
                  <p className="mt-2 font-black text-rose-600">{formatRupiah(voucher.price)}</p>
                  <p className="text-xs text-muted-foreground">Stok {voucher.stock}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
