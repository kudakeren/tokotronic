import { TransactionForm } from "@/components/forms/transaction-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { productsFor } from "@/lib/page-data";

export const dynamic = "force-dynamic";

export default async function PlnTokenPage() {
  const products = await productsFor(["pln"], "Token");
  return <DashboardShell title="Token PLN"><TransactionForm title="Token PLN" customerLabel="Nomor meter" helper="Token listrik tampil setelah transaksi sukses." products={products} /></DashboardShell>;
}
