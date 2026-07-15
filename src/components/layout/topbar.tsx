"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, LogOut, Menu, UserCircle } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/layout/brand-logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { adminNav, sellerNav, userNav } from "@/components/layout/app-sidebar";
import { cn } from "@/lib/utils";

export function Topbar({ title, admin = false, seller = false }: { title: string; admin?: boolean; seller?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const navItems = admin ? adminNav : seller ? sellerNav : userNav;

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/95 px-3 shadow-sm backdrop-blur sm:px-4 lg:h-[72px] lg:px-8">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" className="shrink-0 lg:hidden" aria-label="Buka menu" onClick={() => setOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="min-w-0">
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:text-[11px] lg:text-xs">{admin ? "Admin Panel" : seller ? "Seller Panel" : "Dashboard"}</p>
            <h1 className="truncate text-sm font-black tracking-normal min-[380px]:text-base sm:text-xl">{title}</h1>
          </div>
        </div>
        <div className="ml-2 flex shrink-0 items-center gap-0.5 sm:gap-2">
          <Button variant="ghost" size="icon" aria-label="Notifikasi">
            <Bell className="h-4 w-4" />
          </Button>
          <ThemeToggle />
          <Button asChild variant="ghost" size="icon" aria-label="Profil">
            <Link href={admin ? "/admin/users" : seller ? "/seller/store" : "/dashboard/profile"}>
              <UserCircle className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" className="sm:hidden" aria-label="Keluar" onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:inline-flex" onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOut className="h-4 w-4" />
            <span>Keluar</span>
          </Button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button className="absolute inset-0 bg-slate-950/45" aria-label="Tutup menu" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[min(88vw,340px)] overflow-y-auto border-r bg-background p-4 shadow-2xl">
            <div className="mb-6 flex items-center justify-between gap-3">
              <BrandLogo />
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                Tutup
              </Button>
            </div>
            <nav className="grid gap-2">
              {navItems.map((item) => {
                const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex min-w-0 items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-muted-foreground transition",
                      active ? "bg-red-500 text-white dark:bg-zinc-400 dark:text-slate-950" : "bg-muted/50 hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className="min-w-0 truncate">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
