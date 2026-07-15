import { SellerVoucherForm } from "@/components/vouchers/seller-voucher-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { requireSeller } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate, formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function SellerVouchersPage() {
  const seller = await requireSeller();
  const [categories, vouchers] = await Promise.all([
    prisma.productCategory.findMany({ where: { slug: { in: ["voucher-belanja", "belanja", "kuliner"] } } }),
    prisma.foodVoucher.findMany({ where: { sellerId: seller.id }, orderBy: { createdAt: "desc" } })
  ]);
  const categoryOptions = categories.length ? categories : await prisma.productCategory.findMany({ take: 3 });

  return (
    <DashboardShell title="Kelola Listing Gadget" seller>
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <Card className="glass-card">
          <CardHeader><CardTitle>Tambah voucher</CardTitle></CardHeader>
          <CardContent><SellerVoucherForm categories={categoryOptions} /></CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader><CardTitle>Voucher saya</CardTitle></CardHeader>
          <CardContent className="grid gap-3">
            {vouchers.map((voucher) => (
              <div key={voucher.id} className="rounded-xl border bg-background p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="break-words font-black">{voucher.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{voucher.restaurant} - {voucher.city}</p>
                    <p className="mt-2 text-xs text-muted-foreground">Berlaku sampai {formatDate(voucher.validUntil)}</p>
                  </div>
                  <Badge>{voucher.isActive ? "ACTIVE" : "INACTIVE"}</Badge>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="font-black text-red-600">{formatRupiah(voucher.price)}</p>
                  <p className="text-xs font-bold text-muted-foreground">Stok {voucher.stock}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
