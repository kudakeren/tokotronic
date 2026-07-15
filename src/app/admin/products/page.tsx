import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  await requireAdmin();
  const products = await prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: "desc" }, take: 150 });
  return <DashboardShell title="Manage Products" admin><Card className="glass-card"><CardHeader><CardTitle>CRUD Produk Gadget</CardTitle></CardHeader><CardContent className="space-y-4"><div className="grid gap-3 md:grid-cols-4"><Input placeholder="Nama produk" /><Input placeholder="Kode produk" /><Input placeholder="Harga jual" /><Input placeholder="Admin fee" /></div><Table><THead><TR><TH>Produk</TH><TH>Kategori</TH><TH>Provider</TH><TH>Harga</TH><TH>Status</TH></TR></THead><TBody>{products.map((product) => <TR key={product.id}><TD>{product.name}</TD><TD>{product.category.name}</TD><TD>{product.providerName}</TD><TD>{formatRupiah(product.sellPrice)}</TD><TD><Badge>{product.isActive ? "ACTIVE" : "INACTIVE"}</Badge></TD></TR>)}</TBody></Table><p className="text-sm text-muted-foreground">API CRUD dan bulk status dapat dipanggil dari panel ini.</p></CardContent></Card></DashboardShell>;
}
