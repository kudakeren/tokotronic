import { cn } from "@/lib/utils";

const statusClass: Record<string, string> = {
  SUCCESS: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  PAID: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  ACTIVE: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  PENDING: "animate-pulse bg-cyan-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  FAILED: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  SUSPENDED: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  REFUNDED: "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-300",
  REDEEMED: "bg-zinc-100 text-zinc-700 dark:bg-zinc-500/15 dark:text-zinc-300",
  UNPAID: "bg-zinc-100 text-zinc-700 dark:bg-zinc-500/15 dark:text-zinc-300",
  CANCELLED: "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-300"
};

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  const key = String(children);
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", statusClass[key] ?? "bg-muted text-muted-foreground", className)}>{children}</span>;
}
