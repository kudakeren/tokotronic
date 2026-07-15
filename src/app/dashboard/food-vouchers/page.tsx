import { CalendarDays, MapPin, UtensilsCrossed } from "lucide-react";
import { BuyVoucherButton } from "@/components/vouchers/buy-voucher-button";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { foodVoucherImage } from "@/lib/card-images";
import { prisma } from "@/lib/prisma";
import { formatDate, formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function FoodVouchersPage() {
  const vouchers = await prisma.foodVoucher.findMany({
    where: { isActive: true, stock: { gt: 0 }, validUntil: { gt: new Date() }, seller: { sellerProfile: { status: "APPROVED" } } },
    include: { seller: { include: { sellerProfile: true } }, category: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <DashboardShell title="Voucher Belanja">
      <div className="grid gap-5">
        <Card className="overflow-hidden border border-rose-100 bg-white text-slate-950 shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-rose-50 text-rose-600">
              <UtensilsCrossed className="h-7 w-7" />
            </div>
            <h2 className="text-3xl font-black tracking-normal">Beli Voucher Belanja dari seller terverifikasi.</h2>
            <p className="mt-3 max-w-2xl text-slate-600">Bayar pakai saldo, kode voucher langsung muncul di riwayat transaksi.</p>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {vouchers.map((voucher) => (
            <Card key={voucher.id} className="min-w-0 overflow-hidden border bg-white shadow-sm dark:bg-slate-950">
              <div className="relative h-44 bg-cover bg-center" style={{ backgroundImage: `url(${foodVoucherImage(voucher.title)})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/54 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 rounded-full bg-white/92 px-3 py-1 text-xs font-black text-slate-950 shadow-sm backdrop-blur">
                  {voucher.category.name}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="break-words">{voucher.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{voucher.seller.sellerProfile?.storeName ?? voucher.restaurant}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{voucher.description}</p>
                <div className="grid gap-2 text-sm">
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {voucher.city}</div>
                  <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary" /> Berlaku sampai {formatDate(voucher.validUntil)}</div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xl font-black text-rose-600">{formatRupiah(voucher.price)}</p>
                  <p className="text-xs font-bold text-muted-foreground">Stok {voucher.stock}</p>
                </div>
                <BuyVoucherButton voucherId={voucher.id} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
