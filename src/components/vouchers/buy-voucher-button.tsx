"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function BuyVoucherButton({ voucherId }: { voucherId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <Button
      className="w-full"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        const response = await fetch("/api/food-vouchers/buy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ voucherId })
        });
        const body = await response.json().catch(() => ({}));
        setLoading(false);
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        if (!response.ok) return toast.error(body.message ?? "Gagal membeli voucher");
        toast.success("Listing berhasil dibeli");
        router.push("/dashboard/transactions");
        router.refresh();
      }}
    >
      {loading ? "Memproses..." : "Beli Gadget"}
    </Button>
  );
}
