import { SellerApprovalActions } from "@/components/admin/seller-approval-actions";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminSellersPage() {
  const sellers = await prisma.sellerProfile.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" }
  });
  return (
    <DashboardShell title="Kelola Seller" admin>
      <Card className="glass-card">
        <CardHeader><CardTitle>Approve seller</CardTitle></CardHeader>
        <CardContent className="grid gap-3">
          {sellers.map((seller) => (
            <div key={seller.id} className="rounded-xl border bg-background p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <p className="font-black">{seller.storeName}</p>
                  <p className="text-sm text-muted-foreground">{seller.user.name} - {seller.user.email}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{seller.address}, {seller.city}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Badge>{seller.status}</Badge>
                  <SellerApprovalActions sellerId={seller.id} />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
