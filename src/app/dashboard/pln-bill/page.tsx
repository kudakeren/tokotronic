import { TransactionForm } from "@/components/forms/transaction-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { productsFor } from "@/lib/page-data";

export const dynamic = "force-dynamic";

export default async function PlnBillPage() {
  const products = await productsFor(["pln"], "Tagihan");
  return <DashboardShell title="Tagihan PLN"><TransactionForm title="Cek dan Bayar Tagihan PLN" customerLabel="ID pelanggan" helper="Nama pelanggan dan periode disimulasikan saat pembayaran" products={products} /></DashboardShell>;
}
