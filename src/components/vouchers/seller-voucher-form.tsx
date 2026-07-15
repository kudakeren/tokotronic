"use client";

import type { ProductCategory } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SellerVoucherForm({ categories }: { categories: ProductCategory[] }) {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "");
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="grid gap-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setLoading(true);
        const form = new FormData(event.currentTarget);
        const payload = Object.fromEntries(form.entries());
        const response = await fetch("/api/seller/vouchers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, categoryId, isActive: true })
        });
        const body = await response.json().catch(() => ({}));
        setLoading(false);
        if (!response.ok) return toast.error(body.message ?? "Gagal membuat voucher");
        toast.success("Voucher Belanja dibuat");
        event.currentTarget.reset();
        router.refresh();
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2"><Label>Judul voucher</Label><Input name="title" placeholder="Paket Ayam Geprek Hemat" required /></div>
        <div className="space-y-2"><Label>Kode internal</Label><Input name="code" placeholder="GEPREK-HEMAT" required /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2"><Label>Resto/Toko</Label><Input name="restaurant" required /></div>
        <div className="space-y-2"><Label>Kota</Label><Input name="city" required /></div>
      </div>
      <div className="space-y-2">
        <Label>Kategori</Label>
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {categories.map((category) => <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2"><Label>Deskripsi</Label><Input name="description" placeholder="Voucher berlaku untuk dine-in/takeaway sesuai ketentuan toko" required /></div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2"><Label>Harga</Label><Input name="price" type="number" min={1000} required /></div>
        <div className="space-y-2"><Label>Stok</Label><Input name="stock" type="number" min={0} required /></div>
        <div className="space-y-2"><Label>Berlaku sampai</Label><Input name="validUntil" type="date" required /></div>
      </div>
      <Button disabled={loading}>{loading ? "Menyimpan..." : "Simpan Voucher"}</Button>
    </form>
  );
}
