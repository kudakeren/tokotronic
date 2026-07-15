import { Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandLogo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-red-600 text-white shadow-lg shadow-red-600/20">
        <Smartphone className="h-6 w-6" strokeWidth={2.6} />
        <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-cyan-300 shadow-sm">
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700" />
        </span>
      </div>
      {!compact && (
        <div className="min-w-0 leading-none">
          <p className="truncate text-base font-black tracking-normal text-red-600 dark:text-red-300 sm:text-lg">tokotronicindo.com</p>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 max-[420px]:hidden">Gadget Bekas Bergaransi</p>
        </div>
      )}
    </div>
  );
}
