import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminPromosPage() {
  await requireAdmin();
  const promos = await prisma.promo.findMany();
  return <DashboardShell title="Manage Promo" admin><Card className="glass-card"><CardHeader><CardTitle>Banner dan Kode Promo</CardTitle></CardHeader><CardContent><Table><THead><TR><TH>Kode</TH><TH>Judul</TH><TH>Diskon</TH><TH>Min Transaksi</TH><TH>Status</TH></TR></THead><TBody>{promos.map((promo) => <TR key={promo.id}><TD>{promo.code}</TD><TD>{promo.title}</TD><TD>{promo.discountType} {formatRupiah(promo.discountValue)}</TD><TD>{formatRupiah(promo.minTransaction)}</TD><TD><Badge>{promo.isActive ? "ACTIVE" : "INACTIVE"}</Badge></TD></TR>)}</TBody></Table></CardContent></Card></DashboardShell>;
}
