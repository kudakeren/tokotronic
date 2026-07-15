import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDepositsPage() {
  await requireAdmin();
  const deposits = await prisma.deposit.findMany({ include: { user: true }, orderBy: { createdAt: "desc" }, take: 100 });
  return <DashboardShell title="Manage Deposits" admin><Card className="glass-card"><CardHeader><CardTitle>Approve / Reject Deposit</CardTitle></CardHeader><CardContent><Table><THead><TR><TH>No Deposit</TH><TH>User</TH><TH>Metode</TH><TH>Nominal</TH><TH>Status</TH></TR></THead><TBody>{deposits.map((dep) => <TR key={dep.id}><TD>{dep.depositNumber}</TD><TD>{dep.user.email}</TD><TD>{dep.method}</TD><TD>{formatRupiah(dep.amount)}</TD><TD><Badge>{dep.status}</Badge></TD></TR>)}</TBody></Table><p className="mt-4 text-sm text-muted-foreground">Endpoint approve/reject tersedia: /api/admin/deposits/[id]/approve dan reject.</p></CardContent></Card></DashboardShell>;
}
