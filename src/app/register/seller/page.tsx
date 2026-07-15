import { SellerRegisterForm } from "@/components/forms/auth-forms";

export default function RegisterSellerPage() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-12">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(16,185,129,.16),transparent_28%),radial-gradient(circle_at_84%_20%,rgba(251,191,36,.20),transparent_24%)]" />
      <div className="relative w-full"><SellerRegisterForm /></div>
    </main>
  );
}
