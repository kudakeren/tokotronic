import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminProvidersPage() {
  await requireAdmin();
  const providers = await prisma.provider.findMany({ orderBy: { priority: "asc" } });
  return <DashboardShell title="Manage Providers" admin><Card className="glass-card"><CardHeader><CardTitle>Provider Dummy</CardTitle></CardHeader><CardContent><Table><THead><TR><TH>Nama</TH><TH>Base URL</TH><TH>API Key</TH><TH>Status</TH><TH>Priority</TH></TR></THead><TBody>{providers.map((provider) => <TR key={provider.id}><TD>{provider.name}</TD><TD>{provider.baseUrl}</TD><TD>{provider.apiKeyMasked}</TD><TD><Badge>{provider.status}</Badge></TD><TD>{provider.priority}</TD></TR>)}</TBody></Table></CardContent></Card></DashboardShell>;
}
