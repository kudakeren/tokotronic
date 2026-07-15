"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatRupiah } from "@/lib/utils";

export function DepositForm() {
  const [method, setMethod] = useState("BANK_TRANSFER");
  const [amount, setAmount] = useState(100000);
  const [invoice, setInvoice] = useState<string | null>(null);

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <Card className="min-w-0 border bg-white shadow-sm dark:bg-slate-950">
        <CardHeader><CardTitle>Deposit Saldo</CardTitle></CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={async (event) => {
              event.preventDefault();
              const response = await fetch("/api/deposits", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ method, amount })
              });
              const body = await response.json();
              if (!response.ok) return toast.error("Deposit gagal dibuat");
              setInvoice(body.invoice.invoiceNumber);
              toast.success("Invoice deposit dibuat");
            }}
          >
            <div className="space-y-2">
              <Label>Metode</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                  <SelectItem value="QRIS">QRIS dummy</SelectItem>
                  <SelectItem value="VIRTUAL_ACCOUNT">Virtual Account dummy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Nominal</Label>
              <Input value={amount} onChange={(e) => setAmount(Number(e.target.value))} type="number" min={10000} />
            </div>
            <Button className="w-full">Generate Invoice Deposit</Button>
          </form>
        </CardContent>
      </Card>
      <Card className="min-w-0 border bg-white shadow-sm dark:bg-slate-950">
        <CardHeader><CardTitle>Instruksi</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>Total deposit: <span className="font-semibold text-foreground">{formatRupiah(amount)}</span></p>
          <p>Status awal deposit adalah pending. Admin dapat approve manual dari panel admin dan saldo akan otomatis bertambah.</p>
          {invoice && <p className="break-all rounded-md bg-red-500/10 p-3 text-red-700 dark:text-red-300">Invoice: {invoice}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
