import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireSeller } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function SellerStorePage() {
  const seller = await requireSeller();
  const user = await prisma.user.findUniqueOrThrow({ where: { id: seller.id }, include: { sellerProfile: true } });
  return (
    <DashboardShell title="Profil Toko" seller>
      <Card className="glass-card">
        <CardHeader><CardTitle>{user.sellerProfile?.storeName}</CardTitle></CardHeader>
        <CardContent className="grid gap-3 text-sm">
          <p><span className="font-bold">Status:</span> {user.sellerProfile?.status}</p>
          <p><span className="font-bold">Kota:</span> {user.sellerProfile?.city}</p>
          <p><span className="font-bold">Alamat:</span> {user.sellerProfile?.address}</p>
          <p className="leading-6 text-muted-foreground">{user.sellerProfile?.description}</p>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
