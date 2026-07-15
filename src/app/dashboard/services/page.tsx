import { Search } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ServiceCard } from "@/components/services/service-card";
import { Input } from "@/components/ui/input";
import { serviceLinks } from "@/lib/catalog";

export default function ServicesPage() {
  const categories = ["Semua", "Telekomunikasi", "Utilitas", "Keuangan", "Hiburan", "Gaming", "Cicilan"];
  return (
    <DashboardShell title="Layanan PPOB">
      <div className="space-y-6">
        <div className="relative max-w-lg"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input className="pl-9" placeholder="Cari layanan" /></div>
        <div className="flex flex-wrap gap-2">{categories.map((item) => <span key={item} className="rounded-full border bg-card px-3 py-1 text-sm">{item}</span>)}</div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{serviceLinks.map((service) => <ServiceCard key={service.title} {...service} />)}</div>
      </div>
    </DashboardShell>
  );
}
