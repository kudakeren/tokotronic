import { TransactionForm } from "@/components/forms/transaction-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { productsFor } from "@/lib/page-data";

export const dynamic = "force-dynamic";

export default async function EwalletPage() {
  const products = await productsFor(["e-wallet"]);
  return <DashboardShell title="E-Wallet"><TransactionForm title="Top Up E-Wallet" customerLabel="Nomor HP" helper="GoPay, OVO, DANA, ShopeePay, LinkAja" products={products} /></DashboardShell>;
}
