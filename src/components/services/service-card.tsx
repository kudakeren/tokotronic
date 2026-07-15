import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { serviceImage } from "@/lib/card-images";

export function ServiceCard({ title, category, href, icon: Icon }: { title: string; category: string; href: string; icon: LucideIcon }) {
  return (
    <Link href={href} className="block h-full min-w-0">
      <Card className="h-full min-w-0 border bg-card/95 shadow-sm transition hover:-translate-y-1 hover:border-primary hover:shadow-lg">
        <CardContent className="min-w-0 p-0">
          <div className="relative h-28 overflow-hidden rounded-t-lg bg-cover bg-center" style={{ backgroundImage: `url(${serviceImage(title)})` }}>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/34 via-transparent to-rose-500/22" />
            <div className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-xl bg-white/92 text-rose-600 shadow-sm backdrop-blur">
              <Icon className="h-5 w-5" />
            </div>
          </div>
          <div className="min-w-0 p-4 sm:p-5">
            <p className="break-words font-bold leading-snug">{title}</p>
            <p className="mt-1 break-words text-sm leading-snug text-muted-foreground">{category}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
