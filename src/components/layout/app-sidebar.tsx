"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Boxes, CreditCard, Gift, Home, Landmark, LayoutDashboard, ReceiptText, Settings, ShieldCheck, Store, Users, UtensilsCrossed, WalletCards } from "lucide-react";
import { serviceLinks } from "@/lib/catalog";
import { BrandLogo } from "@/components/layout/brand-logo";
import { cn } from "@/lib/utils";

export const userNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/services", label: "Katalog Gadget", icon: Boxes },
  { href: "/dashboard/food-vouchers", label: "Promo Reseller", icon: UtensilsCrossed },
  { href: "/dashboard/transactions", label: "Riwayat", icon: ReceiptText },
  { href: "/dashboard/referral", label: "Referral", icon: Gift },
  { href: "/dashboard/profile", label: "Profil", icon: Settings }
];

export const adminNav = [
  { href: "/admin", label: "Admin", icon: Home },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/products", label: "Produk", icon: Boxes },
  { href: "/admin/food-vouchers", label: "Listing Gadget", icon: UtensilsCrossed },
  { href: "/admin/sellers", label: "Seller", icon: Store },
  { href: "/admin/categories", label: "Kategori", icon: LayoutDashboard },
  { href: "/admin/providers", label: "Provider", icon: ShieldCheck },
  { href: "/admin/deposits", label: "Deposit", icon: WalletCards },
  { href: "/admin/transactions", label: "Transaksi", icon: CreditCard },
  { href: "/admin/promos", label: "Promo", icon: Gift },
  { href: "/admin/commissions", label: "Komisi", icon: ReceiptText },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 }
];

export const sellerNav = [
  { href: "/seller", label: "Dashboard", icon: LayoutDashboard },
  { href: "/seller/store", label: "Toko Gadget", icon: Store },
  { href: "/seller/products", label: "Produk Gadget", icon: Boxes },
  { href: "/seller/vouchers", label: "Listing Bekas", icon: UtensilsCrossed },
  { href: "/seller/orders", label: "Pesanan Gadget", icon: ReceiptText },
  { href: "/seller/withdraw", label: "Penarikan Saldo", icon: Landmark },
  { href: "/seller/reports", label: "Laporan", icon: BarChart3 }
];

export function AppSidebar({ admin = false, seller = false }: { admin?: boolean; seller?: boolean }) {
  const pathname = usePathname();
  const items = admin ? adminNav : seller ? sellerNav : userNav;
  const homeHref = admin ? "/admin" : seller ? "/seller" : "/dashboard";
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 overflow-y-auto border-r bg-white p-4 shadow-[12px_0_40px_rgba(15,23,42,0.04)] dark:bg-slate-950 lg:block">
      <Link href={homeHref} className="mb-6 block px-2">
        <BrandLogo />
        <p className="mt-2 pl-[52px] text-xs font-medium text-muted-foreground">{admin ? "Admin Console" : seller ? "Seller Area" : "Member Area"}</p>
      </Link>
      <nav className="space-y-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex min-w-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted-foreground transition",
              pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
                ? "bg-rose-500 text-white shadow-md shadow-rose-500/20 dark:bg-violet-400 dark:text-slate-950"
                : "hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span className="min-w-0 truncate">{item.label}</span>
          </Link>
        ))}
      </nav>
      {!admin && !seller && (
        <div className="mt-6 rounded-xl border border-rose-100 bg-rose-50 p-4 text-rose-950">
          <ShieldCheck className="mb-3 h-5 w-5 text-rose-600" />
          <p className="text-sm font-bold">Mode aman aktif</p>
          <p className="mt-1 text-xs leading-5 text-rose-800">Akun, transaksi, dan listing seller divalidasi dari server.</p>
        </div>
      )}
      {!admin && !seller && (
        <div className="mt-6 border-t pt-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">Quick Action</p>
          <div className="grid grid-cols-2 gap-2">
            {serviceLinks.slice(0, 6).map((item) => (
              <Link key={item.title} href={item.href} className={cn("min-w-0 rounded-lg border bg-background p-2 text-xs font-semibold transition hover:-translate-y-0.5 hover:border-primary hover:shadow-sm")}>
                <item.icon className="mb-1 h-4 w-4 text-primary" />
                <span className="block truncate">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

export function MobileBottomNav({ admin = false, seller = false }: { admin?: boolean; seller?: boolean }) {
  const pathname = usePathname();
  const items = (admin ? adminNav : seller ? sellerNav : userNav).slice(0, 5);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/96 px-2 pb-[max(env(safe-area-inset-bottom),8px)] pt-2 shadow-[0_-12px_40px_rgba(15,23,42,0.12)] backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {items.map((item) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-0.5 py-2 text-[10px] font-semibold text-muted-foreground min-[380px]:text-[11px]",
                active && "bg-rose-500 text-white dark:bg-violet-400 dark:text-slate-950"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="max-w-full truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
