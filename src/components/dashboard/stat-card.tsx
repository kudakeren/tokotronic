import { Card, CardContent } from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";

export function StatCard({ title, value, tone = "cyan" }: { title: string; value: string | number; tone?: "cyan" | "rose" | "slate" | "amber" }) {
  const colors = {
    cyan: "from-rose-500/16 to-violet-500/5 border-rose-500/20",
    rose: "from-rose-500/16 to-teal-500/5 border-rose-500/20",
    slate: "from-slate-500/12 to-slate-500/5 border-slate-500/20",
    amber: "from-amber-500/18 to-orange-500/5 border-amber-500/20"
  };
  return (
    <Card className={`overflow-hidden border ${colors[tone]} bg-gradient-to-br shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}>
      <CardContent className="p-5">
        <div className="mb-4 h-1.5 w-10 rounded-full bg-slate-950/80 dark:bg-rose-300" />
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="mt-2 text-2xl font-black tracking-normal text-foreground">{typeof value === "number" && value > 9999 ? formatRupiah(value) : value}</p>
      </CardContent>
    </Card>
  );
}
