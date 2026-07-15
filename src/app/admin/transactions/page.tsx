import { DashboardShell } from "@/components/layout/dashboard-shell";
import { TransactionTable } from "@/components/transaction/transaction-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminTransactionsPage() {
  await requireAdmin();
  const transactions = await prisma.transaction.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return <DashboardShell title="Manage Transactions" admin><Card className="glass-card"><CardHeader><CardTitle>Semua transaksi user</CardTitle></CardHeader><CardContent className="space-y-4"><div className="grid gap-3 md:grid-cols-4"><Input placeholder="Filter status" /><Input placeholder="Filter layanan" /><Input type="date" /><Input placeholder="Update status manual" /></div><TransactionTable transactions={transactions} /></CardContent></Card></DashboardShell>;
}
