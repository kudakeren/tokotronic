# Belanjapulsa.com

Website PPOB production-ready berbasis Next.js App Router, Prisma, PostgreSQL, NextAuth credentials, Tailwind CSS, komponen gaya shadcn, Framer Motion, Recharts, Zod, dan Sonner.

## Cara Install

```bash
npm install
```

## Setup Database

Untuk development lokal di Windows, project ini sudah mendukung PostgreSQL lokal di port `55432`:

```bash
npm run db:start
```

Atau buat database PostgreSQL di Neon, Supabase, atau lokal. Salin `.env.example` menjadi `.env`, lalu isi:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/paynusa?schema=public"
NEXTAUTH_SECRET="ganti-dengan-secret-minimal-32-karakter"
NEXTAUTH_URL="http://localhost:3000"
```

## Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

Seeder membuat akun:

- Admin: `admin@belanjapulsa.com` / `admin123456`
- User: `user@belanjapulsa.com` / `user123456`

## Jalankan Dev

```bash
npm run dev
```

Buka `http://localhost:3000`.

## Build Production

```bash
npm run build
npm run start
```

## Deploy ke Vercel

1. Push project ke GitHub.
2. Import repository di Vercel.
3. Tambahkan env `DATABASE_URL`, `NEXTAUTH_SECRET`, dan `NEXTAUTH_URL`.
4. Jalankan migration dari lokal atau pipeline sebelum deploy.
5. Deploy.

## Fitur Utama

- Landing page fintech Bahasa Indonesia.
- Register/login credentials dengan password bcrypt.
- Middleware proteksi `/dashboard` dan `/admin`.
- Dashboard user, layanan PPOB, transaksi dummy, deposit, invoice, profil, referral.
- Admin panel untuk users, products, categories, transactions, deposits, providers, promos, commissions, reports.
- Saldo berubah dari server-side transaction logic.
- Refund otomatis saat simulasi provider gagal.
- Invoice dan balance mutation tersimpan.
