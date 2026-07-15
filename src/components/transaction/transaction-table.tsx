import Link from "next/link";
import type { Transaction } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { formatDate, formatRupiah } from "@/lib/utils";

export function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  return (
    <>
      <div className="grid gap-3 md:hidden">
        {transactions.length === 0 ? (
          <div className="rounded-xl border bg-background p-5 text-center text-sm text-muted-foreground">Belum ada transaksi.</div>
        ) : (
          transactions.map((trx) => (
            <div key={trx.id} className="min-w-0 rounded-xl border bg-card/70 p-4 shadow-sm">
              <div className="flex min-w-0 items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="break-all font-bold leading-snug">{trx.transactionNumber}</p>
                  <p className="mt-1 break-words text-sm font-semibold leading-snug">{trx.productName}</p>
                  <p className="text-xs text-muted-foreground">{trx.categoryName}</p>
                </div>
                <Badge className="shrink-0">{trx.status}</Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Pelanggan</p>
                  <p className="break-all font-mono text-xs">{trx.customerNumber}</p>
                </div>
                <div className="min-w-0 text-right">
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="break-words font-bold">{formatRupiah(trx.totalAmount)}</p>
                </div>
                <div className="col-span-2 flex items-center justify-between gap-3 border-t pt-3">
                  <span className="text-xs text-muted-foreground">{formatDate(trx.createdAt)}</span>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/dashboard/transactions/${trx.id}`}>Detail</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="hidden md:block">
        <Table className="min-w-[780px]">
          <THead>
            <TR>
              <TH>No. Transaksi</TH>
              <TH>Layanan</TH>
              <TH>Pelanggan</TH>
              <TH>Total</TH>
              <TH>Status</TH>
              <TH>Tanggal</TH>
              <TH />
            </TR>
          </THead>
          <TBody>
            {transactions.length === 0 ? (
              <TR>
                <TD colSpan={7} className="py-10 text-center text-muted-foreground">Belum ada transaksi.</TD>
              </TR>
            ) : transactions.map((trx) => (
              <TR key={trx.id} className="bg-card/40">
                <TD className="max-w-[180px] break-all font-bold">{trx.transactionNumber}</TD>
                <TD><div className="max-w-[220px] break-words font-semibold">{trx.productName}</div><div className="text-xs text-muted-foreground">{trx.categoryName}</div></TD>
                <TD className="break-all font-mono text-xs">{trx.customerNumber}</TD>
                <TD className="font-bold">{formatRupiah(trx.totalAmount)}</TD>
                <TD><Badge>{trx.status}</Badge></TD>
                <TD>{formatDate(trx.createdAt)}</TD>
                <TD><Button asChild size="sm" variant="outline"><Link href={`/dashboard/transactions/${trx.id}`}>Detail</Link></Button></TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </div>
    </>
  );
}
