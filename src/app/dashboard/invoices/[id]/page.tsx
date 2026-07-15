import { Printer } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate, formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function InvoicePage({ params }: { params: { id: string } }) {
  const user = await requireUser();
  const invoice = await prisma.invoice.findFirstOrThrow({ where: { id: params.id, userId: user.id }, include: { transaction: true, deposit: true, user: true } });
  return <DashboardShell title="Invoice"><Card className="glass-card mx-auto max-w-3xl"><CardHeader className="border-b"><div className="flex items-center justify-between"><div><CardTitle>bilbiling.com</CardTitle><p className="text-sm text-muted-foreground">{invoice.invoiceNumber}</p></div><Badge>{invoice.status}</Badge></div></CardHeader><CardContent className="space-y-4 p-6"><div className="grid gap-2 text-sm"><p>Kepada: <b>{invoice.user.name}</b></p><p>Tanggal: {formatDate(invoice.issuedAt)}</p><p>Layanan: {invoice.transaction?.productName ?? "Top Up Saldo"}</p></div><div className="rounded-md border p-4"><Row label="Subtotal" value={formatRupiah(invoice.subtotal)} /><Row label="Admin fee" value={formatRupiah(invoice.adminFee)} /><Row label="Total" value={formatRupiah(invoice.total)} /></div><Button><Printer className="h-4 w-4" /> Print / Download PDF</Button></CardContent></Card></DashboardShell>;
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return <div className="flex justify-between py-2"><span>{label}</span><b>{value}</b></div>;
}
