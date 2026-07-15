"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandLogo } from "@/components/layout/brand-logo";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  return (
    <Card className="glass-card mx-auto w-full max-w-md">
      <CardHeader>
        <BrandLogo />
        <CardTitle>Masuk ke tokotronicindo.com</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setLoading(true);
            const form = new FormData(event.currentTarget);
            const result = await signIn("credentials", {
              email: form.get("email"),
              password: form.get("password"),
              redirect: false
            });
            setLoading(false);
            if (result?.error) return toast.error("Email atau password salah");
            router.replace(searchParams.get("callbackUrl") || "/dashboard");
            router.refresh();
          }}
        >
          <div className="space-y-2">
            <Label>Email</Label>
            <Input name="email" type="email" placeholder="nama@email.com" required />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input name="password" type="password" required />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" /> Ingat saya</label>
            <Link className="text-primary" href="/forgot-password">Lupa password?</Link>
          </div>
          <Button className="w-full" disabled={loading}>{loading ? "Memproses..." : "Masuk"}</Button>
          <p className="text-center text-sm text-muted-foreground">Belum punya akun? <Link className="text-primary" href="/register">Daftar</Link></p>
        </form>
      </CardContent>
    </Card>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <Card className="glass-card mx-auto w-full max-w-lg">
      <CardHeader>
        <BrandLogo />
        <div className="mt-4 space-y-2">
          <span className="inline-flex w-fit rounded-full bg-rose-500/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-rose-700 dark:text-rose-300">
            Akun Pembeli
          </span>
          <CardTitle className="text-2xl font-black tracking-normal sm:text-3xl">Mulai Cari Gadget Bekas Terbaik</CardTitle>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Satu akun untuk melihat stok gadget bekas, menyimpan riwayat, dan lanjut transaksi dengan seller terverifikasi.
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setLoading(true);
            const form = new FormData(event.currentTarget);
            const payload = Object.fromEntries(form.entries());
            const response = await fetch("/api/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...payload, terms: form.get("terms") === "on" })
            });
            const result = await response.json().catch(() => ({}));
            if (!response.ok) {
              setLoading(false);
              return toast.error(result.message ?? "Registrasi gagal. Periksa data Anda.");
            }
            await signIn("credentials", { email: payload.email, password: payload.password, redirect: false });
            router.replace("/dashboard");
            router.refresh();
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Nama lengkap</Label><Input name="name" required /></div>
            <div className="space-y-2"><Label>Nomor HP</Label><Input name="phone" required /></div>
          </div>
          <div className="space-y-2"><Label>Email</Label><Input name="email" type="email" required /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Password</Label><Input name="password" type="password" required /></div>
            <div className="space-y-2"><Label>Confirm password</Label><Input name="confirmPassword" type="password" required /></div>
          </div>
          <div className="space-y-2"><Label>Kode referral</Label><Input name="referralCode" placeholder="Opsional" /></div>
          <label className="flex items-center gap-2 text-sm"><input name="terms" type="checkbox" required /> Saya setuju dengan syarat layanan</label>
          <Button className="h-12 bg-rose-500 text-base font-bold shadow-lg shadow-rose-500/20 hover:bg-rose-600" disabled={loading}>
            {loading ? "Menyiapkan akun..." : "Buat Akun Sekarang"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Sudah terdaftar? <Link className="font-bold text-primary hover:underline" href="/login">Masuk ke akun</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export function SellerRegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <Card className="glass-card mx-auto w-full max-w-2xl">
      <CardHeader>
        <BrandLogo />
        <div className="mt-4 space-y-2">
          <span className="inline-flex w-fit rounded-full bg-amber-400/15 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300">
            Reseller Program
          </span>
          <CardTitle className="text-2xl font-black tracking-normal sm:text-3xl">Daftar Jadi Reseller Gadget</CardTitle>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Kelola stok gadget bekas, pesanan, laporan, dan penarikan saldo setelah akun disetujui admin.
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setLoading(true);
            const form = new FormData(event.currentTarget);
            const payload = Object.fromEntries(form.entries());
            const response = await fetch("/api/auth/register-seller", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...payload, terms: form.get("terms") === "on" })
            });
            const result = await response.json().catch(() => ({}));
            setLoading(false);
            if (!response.ok) return toast.error(result.message ?? "Registrasi seller gagal.");
            toast.success("Pendaftaran seller terkirim. Tunggu approval admin.");
            router.push("/login");
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Nama pemilik</Label><Input name="name" required /></div>
            <div className="space-y-2"><Label>Nomor HP</Label><Input name="phone" required /></div>
          </div>
          <div className="space-y-2"><Label>Email</Label><Input name="email" type="email" required /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Password</Label><Input name="password" type="password" required /></div>
            <div className="space-y-2"><Label>Confirm password</Label><Input name="confirmPassword" type="password" required /></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Nama toko gadget</Label><Input name="storeName" required /></div>
            <div className="space-y-2"><Label>Kota</Label><Input name="city" required /></div>
          </div>
          <div className="space-y-2"><Label>Alamat toko</Label><Input name="address" required /></div>
          <div className="space-y-2"><Label>Deskripsi toko</Label><Input name="description" placeholder="Contoh: iPhone second, MacBook bekas, audio original" required /></div>
          <label className="flex items-center gap-2 text-sm"><input name="terms" type="checkbox" required /> Saya setuju dengan syarat seller</label>
          <Button disabled={loading}>{loading ? "Mengirim pengajuan..." : "Daftar Seller"}</Button>
          <p className="text-center text-sm text-muted-foreground">Sudah punya akun? <Link className="text-primary" href="/login">Masuk</Link></p>
        </form>
      </CardContent>
    </Card>
  );
}
