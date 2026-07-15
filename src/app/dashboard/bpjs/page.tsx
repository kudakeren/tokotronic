import { TransactionForm } from "@/components/forms/transaction-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { productsFor } from "@/lib/page-data";

export const dynamic = "force-dynamic";

export default async function BpjsPage() {
  const products = await productsFor(["bpjs"]);
  return <DashboardShell title="BPJS"><TransactionForm title="Bayar BPJS" customerLabel="Nomor VA / peserta" helper="Pilih bulan pembayaran sesuai tagihan peserta." products={products} /></DashboardShell>;
}
