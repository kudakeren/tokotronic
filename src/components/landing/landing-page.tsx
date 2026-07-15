"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  Gamepad2,
  Headphones,
  Laptop,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Tablet,
  Watch
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { gadgetProducts } from "@/lib/gadget-products";
import { formatRupiah } from "@/lib/utils";

const categories = [
  { label: "iPhone", icon: Smartphone },
  { label: "Android", icon: Smartphone },
  { label: "Laptop", icon: Laptop },
  { label: "Tablet", icon: Tablet },
  { label: "Wearable", icon: Watch },
  { label: "Audio", icon: Headphones },
  { label: "Gaming", icon: Gamepad2 },
  { label: "Kamera", icon: Camera }
];

const heroProducts = gadgetProducts.slice(0, 4);

export function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <style jsx global>{`
        @keyframes tkRise {
          from { transform: translateY(18px); opacity: .1; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes tkFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .tk-rise { animation: tkRise .65s ease-out both; }
        .tk-float { animation: tkFloat 5s ease-in-out infinite; }
      `}</style>

      <TopNav />

      <section className="border-b border-white/10 bg-[#050505]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[1fr_380px]">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-red-700 px-6 py-9 md:px-10 md:py-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,.22),transparent_28%),linear-gradient(135deg,rgba(0,0,0,.2),transparent)]" />
            <div className="relative max-w-2xl tk-rise">
              <p className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[.18em] text-red-700">
                Gadget bekas pilihan
              </p>
              <h1 className="mt-6 text-5xl font-black leading-[1.02] tracking-normal md:text-7xl">
                Jual beli gadget bekas tanpa ribet.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">
                iPhone, Samsung, MacBook, iPad, audio, dan console second dengan kondisi jelas, harga masuk akal, dan seller terverifikasi.
              </p>
              <div className="mt-8 flex max-w-xl gap-3 rounded-xl bg-white p-2 text-black shadow-2xl shadow-black/25">
                <Search className="ml-3 mt-3 h-5 w-5 text-neutral-500" />
                <input className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none" placeholder="Cari iPhone 13, MacBook M1, AirPods..." />
                <Button asChild className="rounded-lg bg-black px-6 font-black text-white hover:bg-neutral-800">
                  <a href="#produk">Cari</a>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {heroProducts.map((product, index) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="tk-rise group grid grid-cols-[112px_1fr] overflow-hidden rounded-xl border border-white/10 bg-[#141414] transition hover:-translate-y-1 hover:border-red-500/70"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <img src={product.image} alt={product.title} className="h-28 w-full object-cover transition duration-500 group-hover:scale-110" />
                <div className="p-4">
                  <p className="text-xs font-bold text-red-400">{product.condition}</p>
                  <h3 className="mt-1 line-clamp-2 font-black">{product.title}</h3>
                  <p className="mt-2 text-sm font-black text-white">{formatRupiah(product.price)}</p>
                  <p className="mt-1 text-xs text-white/50">{product.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="fitur" className="mx-auto max-w-7xl px-5 py-8">
        <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
          {categories.map((item) => (
            <a key={item.label} href="#produk" className="group grid place-items-center gap-3 rounded-xl border border-white/10 bg-[#111] px-2 py-5 text-center text-xs font-bold transition hover:-translate-y-1 hover:border-red-500 hover:bg-red-600">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white/8 text-red-400 group-hover:bg-white group-hover:text-red-600">
                <item.icon className="h-5 w-5" />
              </span>
              {item.label}
            </a>
          ))}
        </div>
      </section>

      <section id="produk" className="mx-auto max-w-7xl px-5 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-normal md:text-4xl">Rekomendasi Gadget Bekas</h2>
            <p className="mt-2 text-sm text-white/55">Produk real second, deskripsi kondisi jelas, dan harga disesuaikan pasar.</p>
          </div>
          <Link href="/login" className="hidden items-center gap-2 text-sm font-bold text-red-400 md:flex">
            Masuk untuk transaksi <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {gadgetProducts.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="overflow-hidden rounded-2xl bg-red-700 md:grid md:grid-cols-[1fr_420px]">
          <div className="p-8 md:p-12">
            <p className="text-sm font-black uppercase tracking-[.18em] text-white/80">Untuk reseller</p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-normal">Punya stok gadget bekas? Jual lewat Tokotronicindo.</h2>
            <p className="mt-5 max-w-2xl leading-8 text-white/85">
              Daftar reseller, tunggu approval admin, lalu kelola stok, order, laporan, dan penarikan saldo dari dashboard seller.
            </p>
            <Button asChild className="mt-8 h-13 rounded-lg bg-white px-7 font-black text-red-700 hover:bg-neutral-100">
              <Link href="/register/seller">Daftar Reseller</Link>
            </Button>
          </div>
          <img
            src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1000&q=85"
            alt="Reseller gadget bekas"
            className="h-72 w-full object-cover md:h-full"
          />
        </div>
      </section>

      <section className="bg-white py-16 text-black">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-3">
          {[
            { title: "Cek kondisi jelas", desc: "Setiap produk punya kondisi, spesifikasi, lokasi, garansi toko, dan catatan harga.", icon: BadgeCheck },
            { title: "Seller diverifikasi", desc: "Reseller tidak langsung aktif. Admin harus approve sebelum bisa berjualan.", icon: ShieldCheck },
            { title: "Alur login lengkap", desc: "User, seller, dan admin tetap memakai sistem login dan dashboard yang sudah tersedia.", icon: ShoppingBag }
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-neutral-200 p-7 transition hover:-translate-y-1 hover:shadow-xl">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-red-50 text-red-700">
                <item.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-xl font-black">{item.title}</h3>
              <p className="mt-3 leading-7 text-neutral-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ProductCard({ product, index }: { product: (typeof gadgetProducts)[number]; index: number }) {
  return (
    <Card className="tk-rise overflow-hidden rounded-xl border border-white/10 bg-[#171717] text-white shadow-none transition duration-300 hover:-translate-y-2 hover:border-red-500/70" style={{ animationDelay: `${Math.min(index, 10) * 45}ms` }}>
      <CardContent className="p-0">
        <Link href={`/products/${product.slug}`}>
          <div className="relative h-64 overflow-hidden bg-neutral-900">
            <img src={product.image} alt={product.title} className="h-full w-full object-cover transition duration-700 hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <span className="absolute left-4 top-4 rounded-full bg-black/75 px-3 py-1 text-xs font-black uppercase tracking-wide text-white backdrop-blur">
              {product.category}
            </span>
            <span className="absolute bottom-4 left-4 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
              {product.condition}
            </span>
          </div>
          <div className="p-5">
            <p className="text-xs text-white/45">{product.seller} • {product.location}</p>
            <h3 className="mt-2 min-h-14 text-xl font-black leading-tight">{product.title}</h3>
            <p className="mt-3 text-2xl font-black text-white">{formatRupiah(product.price)}</p>
            <p className="mt-2 text-sm text-white/50">{product.marketNote}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-red-400">
              Lihat detail <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}

function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2 text-2xl font-black text-white">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-red-600 text-white">T</span>
          tokotronicindo.com
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-bold text-white/70 md:flex">
          <a href="#produk" className="text-red-400">Produk</a>
          <a href="#fitur">Kategori</a>
          <Link href="/login?callbackUrl=/dashboard/transactions">Riwayat</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden text-sm font-bold text-white sm:inline">Login</Link>
          <Button asChild className="rounded-lg bg-red-600 px-5 font-black hover:bg-red-700">
            <Link href="/register">Daftar</Link>
          </Button>
          <Button asChild variant="outline" className="hidden rounded-lg border-white/20 bg-transparent px-5 font-black text-white hover:bg-white hover:text-black md:inline-flex">
            <Link href="/register/seller">Daftar Reseller</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <p className="text-2xl font-black">tokotronicindo.com</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">
            Marketplace gadget bekas untuk pembeli, reseller, dan admin dengan alur transaksi yang rapi.
          </p>
        </div>
        <FooterList title="Kategori" items={["iPhone", "Android", "MacBook", "iPad", "Audio"]} />
        <FooterList title="Akun" items={["Login User", "Daftar User", "Daftar Reseller", "Admin CMS"]} />
        <FooterList title="Bantuan" items={["Cek kondisi", "Garansi toko", "Panduan transaksi", "Kontak"]} />
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-5 pt-8 text-center text-xs text-white/40">
        © 2026 Tokotronicindo. Semua produk bekas wajib dicek sebelum transaksi.
      </div>
    </footer>
  );
}

function FooterList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-black">{title}</p>
      <div className="mt-4 grid gap-3 text-sm text-white/55">
        {items.map((item) => <span key={item}>{item}</span>)}
      </div>
    </div>
  );
}
