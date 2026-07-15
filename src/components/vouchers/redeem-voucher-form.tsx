"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RedeemVoucherForm() {
  const router = useRouter();
  const [redeemCode, setRedeemCode] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <form
      className="grid gap-3 sm:grid-cols-[1fr_auto]"
      onSubmit={async (event) => {
        event.preventDefault();
        setLoading(true);
        const response = await fetch("/api/seller/orders/redeem", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ redeemCode })
        });
        const body = await response.json().catch(() => ({}));
        setLoading(false);
        if (!response.ok) return toast.error(body.message ?? "Gagal redeem");
        toast.success("Voucher berhasil diredeem");
        setRedeemCode("");
        router.refresh();
      }}
    >
      <Input value={redeemCode} onChange={(event) => setRedeemCode(event.target.value)} placeholder="Masukkan kode voucher customer" required />
      <Button disabled={loading}>{loading ? "Cek..." : "Redeem"}</Button>
    </form>
  );
}
