import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, MapPin, ShieldCheck, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGadgetProduct, gadgetProducts } from "@/lib/gadget-products";
import { formatRupiah } from "@/lib/utils";

export function generateStaticParams() {
  return gadgetProducts.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getGadgetProduct(params.slug);
  if (!product) return {};
  return {
    title: `${product.title} - tokotronicindo.com`,
    description: product.description
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getGadgetProduct(params.slug);
  if (!product) notFound();

  const related = gadgetProducts.filter((item) => item.slug !== product.slug && item.category === product.category).slice(0, 3);

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2 text-xl font-black">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-red-600">T</span>
            tokotronicindo.com
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-bold text-white/75">Login</Link>
            <Button asChild className="rounded-lg bg-red-600 font-black hover:bg-red-700">
              <Link href="/register">Daftar</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-8">
        <Link href="/#produk" className="inline-flex items-center gap-2 text-sm font-bold text-white/60 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Kembali ke katalog
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111]">
            <img src={product.image} alt={product.title} className="h-[520px] w-full object-cover" />
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111] p-6 md:p-8">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-black uppercase tracking-wide">{product.category}</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-wide">{product.condition}</span>
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight tracking-normal md:text-5xl">{product.title}</h1>
            <p className="mt-4 text-4xl font-black text-red-400">{formatRupiah(product.price)}</p>

            <div className="mt-6 grid gap-3 text-sm text-white/70">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-red-400" /> {product.location}</p>
              <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-red-400" /> {product.warranty}</p>
              <p className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-red-400" /> Seller: {product.seller}</p>
              <p className="flex items-center gap-2"><Star className="h-4 w-4 text-red-400" /> Terjual {product.soldCount} unit sejenis</p>
            </div>

            <div className="mt-7 rounded-xl bg-white p-5 text-black">
              <p className="text-sm font-black uppercase tracking-wide text-red-700">Catatan Harga</p>
              <p className="mt-2 leading-7 text-neutral-700">{product.marketNote}</p>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Button asChild className="h-13 rounded-lg bg-red-600 font-black hover:bg-red-700">
                <Link href={`/login?callbackUrl=${encodeURIComponent(`/products/${product.slug}`)}`}>
                  Login untuk Beli <ShoppingBag className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-13 rounded-lg border-white/20 bg-transparent font-black text-white hover:bg-white hover:text-black">
                <Link href="/register">Buat Akun</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <section className="rounded-2xl border border-white/10 bg-[#111] p-6 md:p-8">
            <h2 className="text-2xl font-black">Spesifikasi & Kondisi</h2>
            <div className="mt-5 grid gap-3">
              {product.specs.map((spec) => (
                <div key={spec} className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm text-white/80">
                  <BadgeCheck className="h-4 w-4 text-red-400" />
                  {spec}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-[#111] p-6 md:p-8">
            <h2 className="text-2xl font-black">Deskripsi Produk</h2>
            <p className="mt-5 leading-8 text-white/70">{product.description}</p>
            <p className="mt-5 leading-8 text-white/70">
              Produk bekas punya kemungkinan bekas pemakaian ringan. Pembeli disarankan cek ulang foto, kondisi baterai, jaringan, kamera, layar, tombol, dan kelengkapan sebelum checkout.
            </p>
          </section>
        </div>

        {related.length > 0 && (
          <section className="py-12">
            <h2 className="text-2xl font-black">Produk sejenis</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/products/${item.slug}`} className="overflow-hidden rounded-xl border border-white/10 bg-[#111] transition hover:-translate-y-1 hover:border-red-500">
                  <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
                  <div className="p-5">
                    <h3 className="font-black">{item.title}</h3>
                    <p className="mt-2 text-red-400">{formatRupiah(item.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
