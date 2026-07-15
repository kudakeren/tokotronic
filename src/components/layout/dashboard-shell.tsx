import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileBottomNav } from "@/components/layout/app-sidebar";
import { Topbar } from "@/components/layout/topbar";

export function DashboardShell({ title, admin = false, seller = false, children }: { title: string; admin?: boolean; seller?: boolean; children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,hsl(var(--muted))_0%,hsl(var(--background))_280px)]">
      <div className="flex items-start">
        <AppSidebar admin={admin} seller={seller} />
        <main className="min-w-0 flex-1 overflow-x-hidden">
          <Topbar title={title} admin={admin} seller={seller} />
          <div className="mx-auto w-full max-w-7xl p-4 pb-24 lg:p-8">{children}</div>
        </main>
      </div>
      <MobileBottomNav admin={admin} seller={seller} />
    </div>
  );
}
