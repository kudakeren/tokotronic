import { TransactionForm } from "@/components/forms/transaction-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { productsFor } from "@/lib/page-data";

export const dynamic = "force-dynamic";

export default async function VoucherGamePage() {
  const products = await productsFor(["voucher-game"]);
  return <DashboardShell title="Voucher Game"><TransactionForm title="Voucher Game" customerLabel="User ID / Server ID" helper="Mobile Legends, Free Fire, PUBG, Valorant, Genshin Impact" products={products} /></DashboardShell>;
}
