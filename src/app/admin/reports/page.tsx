import { RevenueChart } from "@/components/charts/revenue-chart";
import { StatCard } from "@/components/dashboard/stat-card";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  await requireAdmin();
  const [transactions, deposits, revenueRows] = await Promise.all([
    prisma.transaction.count(),
    prisma.deposit.count(),
    prisma.transaction.findMany({ where: { status: "SUCCESS" }, select: { adminFee: true } })
  ]);
  const revenue = revenueRows.reduce((sum, row) => sum + Number(row.adminFee), 0);
  return <DashboardShell title="Reports" admin><div className="grid gap-6"><div className="grid gap-4 md:grid-cols-3"><StatCard title="Laporan transaksi" value={transactions} /><StatCard title="Laporan deposit" value={deposits} tone="amber" /><StatCard title="Laporan revenue" value={revenue} tone="rose" /></div><Card className="glass-card"><CardHeader><CardTitle>Export CSV</CardTitle></CardHeader><CardContent className="space-y-4"><div className="grid gap-3 md:grid-cols-3"><Input type="date" /><Input type="date" /><Button>Export CSV</Button></div><RevenueChart /></CardContent></Card></div></DashboardShell>;
}
