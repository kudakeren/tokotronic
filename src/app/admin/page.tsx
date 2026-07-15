import { AdminChart } from "@/components/charts/admin-chart";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { StatCard } from "@/components/dashboard/stat-card";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { TransactionTable } from "@/components/transaction/transaction-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Boxes, CreditCard, DatabaseZap, Landmark, ShieldCheck, TrendingUp, Users, WalletCards } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/utils";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdmin();
  const [users, transactions, pendingDeposits, success, failed, recent] = await Promise.all([
    prisma.user.count(),
    prisma.transaction.count(),
    prisma.deposit.count({ where: { status: "PENDING" } }),
    prisma.transaction.count({ where: { status: "SUCCESS" } }),
    prisma.transaction.count({ where: { status: "FAILED" } }),
    prisma.transaction.findMany({ orderBy: { createdAt: "desc" }, take: 6 })
  ]);
  return (
    <DashboardShell title="Admin Dashboard" admin>
      <div className="grid gap-6">
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <Card className="overflow-hidden border border-rose-100 bg-white text-slate-950 shadow-[0_24px_80px_rgba(16,185,129,.12)]">
            <CardContent className="relative p-6">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-rose-400 via-rose-300 to-violet-300" />
              <div className="relative">
                <TrendingUp className="mb-5 h-8 w-8 text-rose-500" />
                <h2 className="text-3xl font-black tracking-normal">Dashboard tokotronicindo.com</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Pantau listing gadget, order, reseller, refund, promo, dan performa penjualan harian dari satu console.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-4">
                  <AdminHeroMetric label="GMV marketplace" value={formatRupiah(18450000)} />
                  <AdminHeroMetric label="Success rate" value="99.1%" />
                  <AdminHeroMetric label="Reseller aktif" value="4 toko" />
                  <AdminHeroMetric label="SLA" value="< 3 dtk" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden border bg-white shadow-sm dark:bg-slate-950">
            <CardContent className="relative p-5">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-300 via-rose-400 to-violet-300" />
              <div className="space-y-4">
                <AdminQueue icon={<WalletCards className="h-5 w-5" />} title="Deposit pending" text={`${pendingDeposits} deposit menunggu approval`} tone="text-amber-600 bg-amber-500/10" />
                <AdminQueue icon={<AlertTriangle className="h-5 w-5" />} title="Transaksi gagal" text={`${failed} transaksi perlu dicek/refund`} tone="text-red-600 bg-red-500/10" />
                <AdminQueue icon={<ShieldCheck className="h-5 w-5" />} title="Audit stok & saldo" text="Mutasi saldo dan listing gadget tercatat real-time" tone="text-rose-600 bg-rose-500/10" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <StatCard title="Total user" value={users} />
          <StatCard title="Total transaksi" value={transactions} />
          <StatCard title="Deposit pending" value={pendingDeposits} tone="amber" />
          <StatCard title="Sukses" value={success} tone="rose" />
          <StatCard title="Gagal" value={failed} tone="slate" />
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["/admin/users", "Manage Users", "Role, status, saldo, dan detail user", Users, "bg-rose-500/10 text-rose-600"],
            ["/admin/products", "Manage Gadget", "Harga jual, kondisi, seller, kategori", Boxes, "bg-rose-500/10 text-rose-600"],
            ["/admin/deposits", "Approve Deposits", "Validasi deposit dan tambah saldo", Landmark, "bg-amber-500/10 text-amber-600"],
            ["/admin/transactions", "Refund Center", "Update status dan refund gagal", CreditCard, "bg-rose-500/10 text-rose-600"]
          ].map(([href, title, text, Icon, tone]) => (
            <Link key={String(title)} href={String(href)} className="group rounded-3xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-rose-400 hover:shadow-xl dark:bg-slate-950">
              <div className={`mb-5 grid h-12 w-12 place-items-center rounded-2xl ${String(tone)}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-black">{String(title)}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{String(text)}</p>
              </div>
            </Link>
          ))}
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border bg-white shadow-sm dark:bg-slate-950"><CardHeader><CardTitle>Transaksi harian</CardTitle></CardHeader><CardContent><AdminChart /></CardContent></Card>
          <Card className="border bg-white shadow-sm dark:bg-slate-950"><CardHeader><CardTitle>Revenue</CardTitle></CardHeader><CardContent><RevenueChart /></CardContent></Card>
        </div>

        <section className="grid gap-4 lg:grid-cols-3">
          <Card className="overflow-hidden border bg-white shadow-sm dark:bg-slate-950 lg:col-span-2">
            <CardContent className="relative p-6">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-400 via-rose-300 to-violet-300" />
              <div>
                <CardTitle>Seller & Listing Health</CardTitle>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {["Tronic Second Store", "Apple Preloved Hub", "Android Reseller ID", "Audio & Gaming Corner"].map((name, index) => (
                    <div key={name} className="rounded-2xl border bg-background p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-black">{name}</p>
                        <span className={index === 1 ? "rounded-full bg-amber-500/10 px-2 py-1 text-xs font-bold text-amber-600" : "rounded-full bg-rose-500/10 px-2 py-1 text-xs font-bold text-rose-600"}>{index === 1 ? "Maintenance" : "Active"}</span>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-rose-500" style={{ width: `${index === 1 ? 68 : 92 - index * 8}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border bg-white shadow-sm dark:bg-slate-950">
            <CardContent className="p-6">
              <DatabaseZap className="mb-5 h-8 w-8 text-rose-500" />
              <p className="text-xl font-black">Production checklist</p>
              <div className="mt-4 space-y-3 text-sm">
                {["Database gadget terpisah", "Seed produk gadget tersedia", "Role admin aktif", "Order dan mutasi saldo tercatat"].map((item) => (
                  <div key={item} className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-4 w-4 text-rose-500" />{item}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
        <Card className="border bg-white shadow-sm dark:bg-slate-950"><CardHeader><CardTitle>Recent transactions</CardTitle></CardHeader><CardContent><TransactionTable transactions={recent} /></CardContent></Card>
      </div>
    </DashboardShell>
  );
}

function AdminHeroMetric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl bg-rose-50 p-4"><p className="text-xs font-bold text-rose-700">{label}</p><p className="mt-1 text-xl font-black text-rose-950">{value}</p></div>;
}

function AdminQueue({ icon, title, text, tone }: { icon: React.ReactNode; title: string; text: string; tone: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border bg-background/80 p-4">
      <div className={`rounded-xl p-2 ${tone}`}>{icon}</div>
      <div>
        <p className="font-black">{title}</p>
        <p className="text-sm leading-6 text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
