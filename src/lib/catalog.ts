import {
  BadgeDollarSign,
  Banknote,
  Bolt,
  ChartNoAxesCombined,
  CreditCard,
  Droplets,
  Gamepad2,
  HeartPulse,
  Landmark,
  MonitorPlay,
  Phone,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  Tv,
  WalletCards,
  Wifi
} from "lucide-react";

export const serviceLinks = [
  { title: "Pulsa", href: "/dashboard/pulsa", icon: Phone, category: "Telekomunikasi", slug: "pulsa" },
  { title: "Paket Data", href: "/dashboard/paket-data", icon: Smartphone, category: "Telekomunikasi", slug: "paket-data" },
  { title: "Token PLN", href: "/dashboard/pln-token", icon: Bolt, category: "Utilitas", slug: "pln" },
  { title: "Tagihan PLN", href: "/dashboard/pln-bill", icon: ReceiptText, category: "Utilitas", slug: "pln" },
  { title: "PDAM", href: "/dashboard/pdam", icon: Droplets, category: "Utilitas", slug: "pdam" },
  { title: "BPJS", href: "/dashboard/bpjs", icon: HeartPulse, category: "Keuangan", slug: "bpjs" },
  { title: "E-Wallet", href: "/dashboard/ewallet", icon: WalletCards, category: "Keuangan", slug: "e-wallet" },
  { title: "Internet", href: "/dashboard/services", icon: Wifi, category: "Hiburan", slug: "internet" },
  { title: "TV Kabel", href: "/dashboard/services", icon: Tv, category: "Hiburan", slug: "tv-kabel" },
  { title: "Voucher Game", href: "/dashboard/voucher-game", icon: Gamepad2, category: "Gaming", slug: "voucher-game" },
  { title: "Multifinance", href: "/dashboard/services", icon: Landmark, category: "Cicilan", slug: "multifinance" }
];

export const advantages = [
  { title: "Transaksi real-time", icon: ChartNoAxesCombined },
  { title: "Invoice otomatis", icon: ReceiptText },
  { title: "Riwayat lengkap", icon: BadgeDollarSign },
  { title: "Saldo dummy", icon: Banknote },
  { title: "Admin panel", icon: MonitorPlay },
  { title: "Komisi reseller", icon: CreditCard },
  { title: "Keamanan berlapis", icon: ShieldCheck }
];

export const monthlyChart = [
  { month: "Jan", transaksi: 120, revenue: 2400000 },
  { month: "Feb", transaksi: 170, revenue: 3100000 },
  { month: "Mar", transaksi: 210, revenue: 3900000 },
  { month: "Apr", transaksi: 260, revenue: 5100000 },
  { month: "Mei", transaksi: 330, revenue: 6800000 },
  { month: "Jun", transaksi: 410, revenue: 8200000 }
];
