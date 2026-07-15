import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ReferralPage() {
  const sessionUser = await requireUser();
  const user = await prisma.user.findUniqueOrThrow({ where: { id: sessionUser.id }, include: { referralsMade: true, commissions: true } });
  const commission = user.commissions.reduce((sum, item) => sum + Number(item.amount), 0);
  return <DashboardShell title="Referral dan Komisi"><div className="grid gap-6 md:grid-cols-3"><Card className="glass-card"><CardHeader><CardTitle>Kode Referral</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{user.referralCode}</CardContent></Card><Card className="glass-card"><CardHeader><CardTitle>Total Referral</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{user.referralsMade.length}</CardContent></Card><Card className="glass-card"><CardHeader><CardTitle>Total Komisi</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{formatRupiah(commission)}</CardContent></Card></div><Card className="glass-card mt-6"><CardContent className="p-5 text-sm text-muted-foreground">Share link referral: /register?ref={user.referralCode}. Riwayat komisi tersimpan saat referral bertransaksi sukses.</CardContent></Card></DashboardShell>;
}
