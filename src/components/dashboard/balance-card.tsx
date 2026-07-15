import Link from "next/link";
import { ArrowRight, ReceiptText, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";

export function BalanceCard({ balance }: { balance: number }) {
  return (
    <Card className="overflow-hidden border bg-white shadow-sm dark:bg-slate-950">
      <CardContent className="relative p-5 sm:p-6">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-400 via-red-300 to-zinc-300" />
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-600 ring-1 ring-red-500/15 dark:text-red-300">
              <WalletCards className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Saldo utama</p>
            <p className="mt-2 break-words text-3xl font-black tracking-normal text-foreground sm:text-4xl lg:text-5xl">{formatRupiah(balance)}</p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Saldo siap dipakai untuk transaksi gadget bekas, booking unit, dan invoice pembelian.</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0">
            <Button asChild className="bg-red-500 text-white hover:bg-red-600">
              <Link href="/dashboard/services">
                Lihat katalog <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard/transactions">
                <ReceiptText className="h-4 w-4" />
                Riwayat
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
