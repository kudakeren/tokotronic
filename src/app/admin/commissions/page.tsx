import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminCommissionsPage() {
  await requireAdmin();
  const commissions = await prisma.commission.findMany({ include: { user: true, transaction: true }, orderBy: { createdAt: "desc" } });
  return <DashboardShell title="Manage Commission" admin><Card className="glass-card"><CardHeader><CardTitle>Komisi Reseller/Referral</CardTitle></CardHeader><CardContent><Table><THead><TR><TH>User</TH><TH>Transaksi</TH><TH>Amount</TH><TH>Status</TH></TR></THead><TBody>{commissions.map((item) => <TR key={item.id}><TD>{item.user.email}</TD><TD>{item.transaction?.transactionNumber ?? "-"}</TD><TD>{formatRupiah(item.amount)}</TD><TD><Badge>{item.status}</Badge></TD></TR>)}</TBody></Table></CardContent></Card></DashboardShell>;
}
