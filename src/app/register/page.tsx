import Link from "next/link";
import { RegisterForm } from "@/components/forms/auth-forms";

export default function RegisterPage() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-12">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(16,185,129,.16),transparent_28%),radial-gradient(circle_at_84%_20%,rgba(251,191,36,.20),transparent_24%)]" />
      <div className="relative w-full space-y-4">
        <RegisterForm />
        <div className="mx-auto flex w-full max-w-lg flex-col items-center justify-between gap-3 rounded-2xl border border-red-100 bg-white/92 px-4 py-3 text-center shadow-xl shadow-red-950/5 backdrop-blur md:flex-row md:text-left dark:border-white/10 dark:bg-slate-950/80">
          <div>
            <p className="text-sm font-black text-slate-900 dark:text-white">Punya toko gadget bekas?</p>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-300">Daftarkan stok iPhone, Android, laptop, tablet, dan aksesoris kamu.</p>
          </div>
          <Link
            href="/register/seller"
            className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-red-500 px-5 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5 hover:bg-red-600"
          >
            Daftar Reseller
          </Link>
        </div>
      </div>
    </main>
  );
}
