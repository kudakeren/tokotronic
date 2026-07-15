"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function SellerApprovalActions({ sellerId }: { sellerId: string }) {
  const router = useRouter();
  async function update(action: "approve" | "reject") {
    const response = await fetch(`/api/admin/sellers/${sellerId}/${action}`, { method: "POST" });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) return toast.error(body.message ?? "Gagal update seller");
    toast.success(action === "approve" ? "Seller di-approve" : "Seller ditolak");
    router.refresh();
  }

  return (
    <div className="flex gap-2">
      <Button size="sm" onClick={() => update("approve")}>Approve</Button>
      <Button size="sm" variant="outline" onClick={() => update("reject")}>Reject</Button>
    </div>
  );
}
