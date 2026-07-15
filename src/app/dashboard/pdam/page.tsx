import { TransactionForm } from "@/components/forms/transaction-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { productsFor } from "@/lib/page-data";

export const dynamic = "force-dynamic";

export default async function PdamPage() {
  const products = await productsFor(["pdam"]);
  return <DashboardShell title="PDAM"><TransactionForm title="Bayar PDAM" customerLabel="Nomor pelanggan" helper="Wilayah PDAM tersedia di daftar produk" products={products} /></DashboardShell>;
}
