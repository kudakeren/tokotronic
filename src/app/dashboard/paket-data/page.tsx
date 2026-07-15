import { TransactionForm } from "@/components/forms/transaction-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { productsFor } from "@/lib/page-data";

export const dynamic = "force-dynamic";

export default async function PaketDataPage() {
  const products = await productsFor(["paket-data"]);
  return <DashboardShell title="Paket Data"><TransactionForm title="Paket Data" customerLabel="Nomor HP" helper="Pilih provider dan paket data aktif" products={products} /></DashboardShell>;
}
