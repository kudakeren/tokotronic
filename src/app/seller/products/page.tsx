import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SellerProductsPage() {
  return (
    <DashboardShell title="Produk Gadget Seller" seller>
      <Card className="glass-card">
        <CardHeader><CardTitle>Kelola produk gadget</CardTitle></CardHeader>
        <CardContent className="text-sm leading-6 text-muted-foreground">
          Seller dapat mengelola produk gadget dari katalog pusat. Pengaturan markup dan status produk disiapkan untuk tahap berikutnya.
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
