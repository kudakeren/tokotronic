import { AdminChart } from "@/components/charts/admin-chart";
import Link from "next/link";
import { BalanceCard } from "@/components/dashboard/balance-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ServiceCard } from "@/components/services/service-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionTable } from "@/components/transaction/transaction-table";
import { BadgeCheck, BellRing, Clock3, CreditCard, Gift, Search, ShieldCheck, Sparkles, TrendingUp, Zap } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { serviceLinks } from "@/lib/catalog";
import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

const brandLogos = {
  dana: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Logo_dana_blue.svg",
  telkomsel: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Telkomsel_2021_icon.svg",
  pln: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Logo_PLN.svg",
  kfc: "https://commons.wikimedia.org/wiki/Special:Redirect/file/KFC_logo.svg"
};

export default async function DashboardPage() {
  const sessionUser = await requireUser();
  const [user, transactions, counts] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: sessionUser.id } }),
    prisma.transaction.findMany({ where: { userId: sessionUser.id }, orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.transaction.groupBy({ by: ["status"], where: { userId: sessionUser.id }, _count: true })
  ]);
  const success = counts.find((item) => item.status === "SUCCESS")?._count ?? 0;
  const pending = counts.find((item) => item.status === "PENDING")?._count ?? 0;
  return (
    <DashboardShell title={`Halo, ${user.name ?? "Pengguna"}`}>
      <div className="grid gap-6">
        <Card className="overflow-hidden rounded-[32px] border border-rose-100 bg-white shadow-[0_22px_70px_rgba(16,185,129,.12)]">
          <CardContent className="relative p-0">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-rose-400 via-rose-300 to-violet-300" />
            <div className="absolute right-0 top-0 h-36 w-36 rounded-bl-[80px] bg-amber-100/70" />
            <div className="relative grid gap-6 p-5 text-slate-950 sm:p-8 lg:grid-cols-[1fr_360px]">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-sm font-black text-rose-700">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  Dashboard transaksi aktif
                </p>
                <h2 className="mt-5 text-3xl font-black tracking-normal sm:text-5xl">Mau transaksi apa hari ini?</h2>
                <p className="mt-3 max-w-xl leading-7 text-slate-600">Cari produk PPOB atau Voucher Belanja, isi detail pesanan, bayar dengan saldo, lalu simpan invoice otomatis.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
                  <Link href="/dashboard/services" className="flex min-w-0 items-center gap-3 rounded-2xl border bg-slate-50 p-4 text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-rose-300">
                    <Search className="h-5 w-5 text-slate-400" />
                    <span className="min-w-0 truncate font-semibold text-slate-500">Cari pulsa, PLN, e-wallet, Voucher Belanja...</span>
                  </Link>
                  <Link href="/dashboard/services" className="rounded-2xl bg-yellow-300 px-5 py-4 text-center font-black text-slate-950 transition hover:bg-yellow-200">Mulai bayar</Link>
                </div>
              </div>
              <div className="rounded-[28px] border bg-rose-50/80 p-5">
                <p className="text-sm font-bold text-rose-700">Ringkasan bulan ini</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <MiniMetric label="Sukses" value={`${success}`} />
                  <MiniMetric label="Pending" value={`${pending}`} />
                  <MiniMetric label="Total" value={`${transactions.length}`} />
                  <MiniMetric label="Saldo" value={formatRupiah(user.balance)} small />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <BalanceCard balance={Number(user.balance)} />

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Total transaksi" value={transactions.length} />
          <StatCard title="Transaksi sukses" value={success} tone="rose" />
          <StatCard title="Transaksi pending" value={pending} tone="amber" />
          <StatCard title="Pengeluaran bulan ini" value={transactions.reduce((sum, trx) => sum + Number(trx.totalAmount), 0)} tone="slate" />
        </div>

        <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
          <Card className="border bg-white shadow-sm dark:bg-slate-950">
            <CardHeader className="flex-row items-center justify-between gap-4">
              <div>
                <CardTitle>Produk paling dicari</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">Tampilan dibuat seperti katalog marketplace, bukan dashboard kosong.</p>
              </div>
              <BadgeCheck className="hidden h-5 w-5 text-rose-500 sm:block" />
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Token PLN 100K", "Rumah & Tagihan", formatRupiah(102500), brandLogos.pln, "from-[#fff6cd] to-[#dff7ff]"],
                  ["Top Up DANA", "Dompet Digital", formatRupiah(101000), brandLogos.dana, "from-[#e7f5ff] to-[#d9ecff]"],
                  ["Voucher KFC 50K", "Voucher Belanja", formatRupiah(50000), brandLogos.kfc, "from-[#fff1f2] to-[#f8fafc]"],
                  ["Paket Data Telkomsel", "Telekomunikasi", formatRupiah(65000), brandLogos.telkomsel, "from-[#fff2f2] to-[#ffe1c7]"]
                ].map(([title, category, price, logo, tone]) => (
                  <ProductTile key={title} title={title} category={category} price={price} logo={logo} tone={tone} />
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden border-0 bg-slate-950 shadow-sm dark:bg-slate-900">
            <CardContent className="relative min-h-full p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,203,5,.24),transparent_28%),radial-gradient(circle_at_10%_90%,rgba(0,100,210,.36),transparent_30%)]" />
              <div className="relative flex h-full min-h-72 flex-col justify-end text-white">
                <Gift className="mb-4 h-8 w-8 text-yellow-300" />
                <p className="text-2xl font-black">Voucher referral aktif</p>
                <p className="mt-2 text-sm leading-6 text-white/82">Bagikan kode referral dan dapatkan komisi setiap transaksi sukses.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Card className="border bg-white shadow-sm dark:bg-slate-950">
          <CardHeader className="flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>Quick Action Layanan</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Produk yang paling sering dipakai user PPOB.</p>
            </div>
            <div className="hidden items-center gap-2 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-bold text-rose-600 sm:flex">
              <BadgeCheck className="h-3.5 w-3.5" />
              Provider aktif
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">{serviceLinks.slice(0, 6).map((service) => <ServiceCard key={service.title} {...service} />)}</div>
          </CardContent>
        </Card>
        <div className="grid gap-6 lg:grid-cols-[1fr_440px]">
          <Card className="border bg-white shadow-sm dark:bg-slate-950"><CardHeader><CardTitle>Chart transaksi bulanan</CardTitle></CardHeader><CardContent><AdminChart /></CardContent></Card>
          <Card className="border bg-white shadow-sm dark:bg-slate-950">
            <CardHeader><CardTitle>Promo dan Operasional</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Promo icon={<TrendingUp className="h-4 w-4" />} title="Cashback admin fee" text="Promo untuk transaksi PLN dan e-wallet." />
              <Promo icon={<CreditCard className="h-4 w-4" />} title="Voucher Belanja" text="Kode voucher unik muncul setelah pembayaran sukses." />
              <Promo icon={<Clock3 className="h-4 w-4" />} title="Invoice instan" text="Invoice paid dibuat saat transaksi provider sukses." />
            </CardContent>
          </Card>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            ["Keamanan saldo", "Semua debit, refund, dan pembayaran tersimpan sebagai mutasi.", ShieldCheck],
            ["Provider aktif", "Routing produk disiapkan untuk proses transaksi PPOB.", Zap],
            ["Notifikasi", "Status pending dan sukses mudah dipantau user.", BellRing]
          ].map(([title, text, Icon]) => (
            <Card key={String(title)} className="overflow-hidden border bg-white shadow-sm dark:bg-slate-950">
              <CardContent className="relative p-5">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-500 to-violet-400" />
                <div>
                  <Icon className="mb-4 h-6 w-6 text-rose-600" />
                  <p className="font-black">{String(title)}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{String(text)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card className="border bg-white shadow-sm dark:bg-slate-950"><CardHeader><CardTitle>Riwayat transaksi terbaru</CardTitle></CardHeader><CardContent><TransactionTable transactions={transactions} /></CardContent></Card>
      </div>
    </DashboardShell>
  );
}

function MiniMetric({ label, value, small = false }: { label: string; value: string; small?: boolean }) {
  return <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-rose-100"><p className="text-xs font-semibold text-slate-500">{label}</p><p className={small ? "mt-1 truncate text-sm font-black text-rose-700" : "mt-1 text-2xl font-black text-rose-700"}>{value}</p></div>;
}

function ProductTile({ title, category, price, logo, tone }: { title: string; category: string; price: string; logo: string; tone: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:border-rose-400 hover:shadow-lg dark:bg-slate-900">
      <div className={`relative h-28 bg-gradient-to-br ${tone} p-4`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,255,255,.74),transparent_28%)]" />
        <div className="relative flex h-full items-center justify-between gap-3">
          <div className="grid h-16 min-w-16 place-items-center rounded-2xl bg-white/92 p-3 shadow-lg shadow-slate-950/10">
            <img src={logo} alt={`${title} logo`} className="max-h-10 max-w-24 object-contain" />
          </div>
          <span className="rounded-full bg-rose-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm">Instan</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs font-bold text-rose-600">{category}</p>
        <p className="mt-1 font-black">{title}</p>
        <p className="mt-3 font-black text-rose-600">{price}</p>
      </div>
    </div>
  );
}

function Promo({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border bg-white p-4 dark:bg-slate-900">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600">{icon}</div>
      <p className="font-black">{title}</p>
      <p className="mt-1 leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}
