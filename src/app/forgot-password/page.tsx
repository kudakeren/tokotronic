import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-[url('/images/promo-pln.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-white/72 backdrop-blur-[2px] dark:bg-slate-950/78" />
      <Card className="glass-card w-full max-w-md">
        <CardHeader><CardTitle>Reset Password</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="nama@email.com" /></div>
          <Button className="w-full">Kirim Link Reset Dummy</Button>
          <Button asChild variant="ghost" className="w-full"><Link href="/login">Kembali masuk</Link></Button>
        </CardContent>
      </Card>
    </main>
  );
}
