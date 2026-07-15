import Link from "next/link";
import { Search } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { gadgetProducts } from "@/lib/gadget-products";
import { formatRupiah } from "@/lib/utils";

export default function ServicesPage() {
  const categories = ["Semua", "iPhone", "Android", "Laptop", "Tablet", "Audio", "Gaming"];
  return (
    <DashboardShell title="Katalog Gadget Bekas">
      <div className="space-y-6">
        <div className="relative max-w-lg">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Cari iPhone, MacBook, iPad, AirPods..." />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <span key={item} className="rounded-full border bg-card px-3 py-1 text-sm font-semibold text-red-800">
              {item}
            </span>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gadgetProducts.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`}>
              <Card className="h-full overflow-hidden border bg-white shadow-sm transition hover:-translate-y-1 hover:border-red-500 hover:shadow-lg">
                <div className="relative h-44 overflow-hidden bg-red-50">
                  <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-black uppercase text-red-800 shadow-sm">
                    {product.category}
                  </span>
                </div>
                <CardContent className="p-4">
                  <p className="text-xs font-semibold text-muted-foreground">{product.seller} - {product.location}</p>
                  <h3 className="mt-2 line-clamp-2 text-lg font-black leading-tight">{product.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{product.marketNote}</p>
                  <p className="mt-4 text-xl font-black text-red-800">{formatRupiah(product.price)}</p>
                  <span className="mt-4 inline-flex text-sm font-bold text-red-700">Lihat detail -&gt;</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
