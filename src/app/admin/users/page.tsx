import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  await requireAdmin();
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return <DashboardShell title="Manage Users" admin><Card className="glass-card"><CardHeader><CardTitle>List user</CardTitle></CardHeader><CardContent className="space-y-4"><Input placeholder="Search/filter user" /><Table><THead><TR><TH>Nama</TH><TH>Email</TH><TH>Role</TH><TH>Status</TH><TH>Saldo</TH></TR></THead><TBody>{users.map((user) => <TR key={user.id}><TD>{user.name}</TD><TD>{user.email}</TD><TD><Badge>{user.role}</Badge></TD><TD><Badge>{user.status}</Badge></TD><TD>{formatRupiah(user.balance)}</TD></TR>)}</TBody></Table><p className="text-sm text-muted-foreground">Endpoint PATCH role/status dan adjust saldo tersedia untuk integrasi action UI.</p></CardContent></Card></DashboardShell>;
}
