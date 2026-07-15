import { TransactionForm } from "@/components/forms/transaction-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { productsFor } from "@/lib/page-data";

export const dynamic = "force-dynamic";

export default async function PulsaPage() {
  const products = await productsFor(["pulsa"]);
  return <DashboardShell title="Beli Pulsa"><TransactionForm title="Beli Pulsa" customerLabel="Nomor HP" helper="Provider dideteksi otomatis: Telkomsel, Indosat, XL, Axis, Tri, Smartfren." products={products} /></DashboardShell>;
}
