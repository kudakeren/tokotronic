import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const sessionUser = await requireUser();
  const user = await prisma.user.findUniqueOrThrow({ where: { id: sessionUser.id } });
  return <DashboardShell title="Profil"><div className="grid gap-6 lg:grid-cols-2"><Card className="glass-card"><CardHeader><CardTitle>Data Akun</CardTitle></CardHeader><CardContent className="space-y-4"><div className="space-y-2"><Label>Nama</Label><Input defaultValue={user.name ?? ""} /></div><div className="space-y-2"><Label>Nomor HP</Label><Input defaultValue={user.phone} /></div><div className="space-y-2"><Label>Avatar URL</Label><Input defaultValue={user.image ?? ""} /></div></CardContent></Card><Card className="glass-card"><CardHeader><CardTitle>Security Settings</CardTitle></CardHeader><CardContent className="space-y-4"><Input placeholder="Password lama" type="password" /><Input placeholder="Password baru" type="password" /><p className="text-sm text-muted-foreground">Login terakhir dari Jakarta, perangkat Chrome.</p></CardContent></Card></div></DashboardShell>;
}
