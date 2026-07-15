import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  await requireAdmin();
  const categories = await prisma.productCategory.findMany({ include: { _count: { select: { products: true } } } });
  return <DashboardShell title="Manage Categories" admin><Card className="glass-card"><CardHeader><CardTitle>Kategori Produk</CardTitle></CardHeader><CardContent><Table><THead><TR><TH>Nama</TH><TH>Slug</TH><TH>Icon</TH><TH>Produk</TH></TR></THead><TBody>{categories.map((cat) => <TR key={cat.id}><TD>{cat.name}</TD><TD>{cat.slug}</TD><TD>{cat.icon}</TD><TD>{cat._count.products}</TD></TR>)}</TBody></Table></CardContent></Card></DashboardShell>;
}
