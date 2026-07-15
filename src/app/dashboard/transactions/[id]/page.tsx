import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate, formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function TransactionDetailPage({ params }: { params: { id: string } }) {
  const user = await requireUser();
  const trx = await prisma.transaction.findFirstOrThrow({ where: { id: params.id, userId: user.id }, include: { invoices: true } });
  const invoice = trx.invoices[0];
  return <DashboardShell title="Detail Transaksi"><Card className="glass-card max-w-3xl"><CardHeader><CardTitle>{trx.transactionNumber}</CardTitle></CardHeader><CardContent className="grid gap-3 text-sm"><Row label="Layanan" value={trx.productName} /><Row label="Nomor pelanggan" value={trx.customerNumber} /><Row label="Harga" value={formatRupiah(trx.price)} /><Row label="Admin fee" value={formatRupiah(trx.adminFee)} /><Row label="Total" value={formatRupiah(trx.totalAmount)} /><Row label="Status" value={<Badge>{trx.status}</Badge>} /><Row label="Tanggal" value={formatDate(trx.createdAt)} /><Row label="Serial/token" value={trx.serialNumber ?? "-"} />{invoice && <Button asChild className="mt-4 w-fit"><Link href={`/dashboard/invoices/${invoice.id}`}>Lihat Invoice</Link></Button>}</CardContent></Card></DashboardShell>;
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return <div className="flex justify-between gap-4 border-b pb-2"><span className="text-muted-foreground">{label}</span><span className="font-medium">{value}</span></div>;
}
