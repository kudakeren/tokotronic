"use client";

import type { Product } from "@prisma/client";
import { CheckCircle2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { serviceImage } from "@/lib/card-images";
import { formatRupiah } from "@/lib/utils";

type ProductLike = Pick<Product, "id" | "name" | "sellPrice" | "adminFee" | "description" | "providerName">;

export function TransactionForm({
  title,
  customerLabel,
  products,
  helper
}: {
  title: string;
  customerLabel: string;
  products: ProductLike[];
  helper?: string;
}) {
  const [productId, setProductId] = useState(products[0]?.id ?? "");
  const [customerNumber, setCustomerNumber] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const selected = useMemo(() => products.find((item) => item.id === productId), [productId, products]);
  const total = selected ? Number(selected.sellPrice) + Number(selected.adminFee) : 0;

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <Card className="min-w-0 border bg-white shadow-sm dark:bg-slate-950">
        <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={async (event) => {
              event.preventDefault();
              setSuccess(null);
              const response = await fetch("/api/transactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, customerNumber })
              });
              const body = await response.json();
              if (!response.ok) return toast.error(body.message?.includes("INSUFFICIENT") ? "Saldo tidak cukup" : "Transaksi gagal dipreds");
              setSuccess(body.transaction.serialNumber ?? body.transaction.transactionNumber);
              toast.success("Transaksi sukses");
            }}
          >
            <div className="space-y-2">
              <Label>{customerLabel}</Label>
              <Input value={customerNumber} onChange={(e) => setCustomerNumber(e.target.value)} placeholder={helper ?? "Masukkan nomor pelanggan"} required />
            </div>
            <div className="space-y-2">
              <Label>Produk</Label>
              <Select value={productId} onValueChange={setProductId}>
                <SelectTrigger><SelectValue placeholder="Pilih produk" /></SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>{product.name} - {formatRupiah(product.sellPrice)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {products.map((product) => {
                const active = product.id === productId;
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => setProductId(product.id)}
                    className={`min-w-0 overflow-hidden rounded-2xl border bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary dark:bg-slate-900 ${active ? "border-primary ring-2 ring-primary/20" : ""}`}
                  >
                    <div className="relative h-24 bg-cover bg-center" style={{ backgroundImage: `url(${serviceImage(product.name)})` }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/40 via-transparent to-red-500/20" />
                      {active && <div className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-black text-white">Dipilih</div>}
                    </div>
                    <div className="p-3">
                      <p className="line-clamp-2 text-sm font-black">{product.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{product.providerName}</p>
                      <p className="mt-2 font-black text-primary">{formatRupiah(product.sellPrice)}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            <Button className="w-full" disabled={!selected}>Bayar Sekarang</Button>
          </form>
        </CardContent>
      </Card>
      <Card className="min-w-0 border bg-white shadow-sm dark:bg-slate-950">
        <CardHeader><CardTitle>Ringkasan Pembayaran</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {selected && (
            <div className="relative mb-2 h-36 overflow-hidden rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url(${serviceImage(selected.name)})` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/56 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 rounded-full bg-white/92 px-3 py-1 text-xs font-black text-slate-950 shadow-sm backdrop-blur">
                {selected.providerName}
              </div>
            </div>
          )}
          <SummaryRow label="Produk" value={selected?.name ?? "-"} strong />
          <SummaryRow label="Provider" value={selected?.providerName ?? "-"} />
          <SummaryRow label="Harga" value={selected ? formatRupiah(selected.sellPrice) : "-"} />
          <SummaryRow label="Admin fee" value={selected ? formatRupiah(selected.adminFee) : "-"} />
          <div className="flex flex-col gap-1 border-t pt-3 font-bold sm:flex-row sm:justify-between"><span>Total bayar</span><span>{formatRupiah(total)}</span></div>
          {success && (
            <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300">
              <CheckCircle2 className="mb-2 h-5 w-5" />
              Serial/Referensi: {success}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex flex-col gap-1 text-sm sm:flex-row sm:items-start sm:justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={strong ? "break-words font-semibold sm:text-right" : "break-words sm:text-right"}>{value}</span>
    </div>
  );
}
