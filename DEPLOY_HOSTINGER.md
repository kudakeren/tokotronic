# Deploy Belanjapulsa.com ke Hostinger Node.js

## Yang dibutuhkan

- Hosting Hostinger yang punya fitur Node.js App.
- Database PostgreSQL external, misalnya Neon atau Supabase.
- Domain/subdomain yang diarahkan ke app Hostinger.

## Environment variables

Isi di panel Hostinger Node.js:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/belanjapulsa?sslmode=require&schema=public
NEXTAUTH_SECRET=ganti-dengan-secret-random-minimal-32-karakter
NEXTAUTH_URL=https://domain-kamu.com
```

## Command Hostinger

Build command:

```bash
npm install && npx prisma generate && npx prisma migrate deploy && npm run build
```

Start command:

```bash
npm run start
```

## Seed akun demo

Jalankan sekali saja setelah migration production berhasil:

```bash
npm run prisma:seed
```

Akun demo setelah seed:

- Admin: `admin@belanjapulsa.com` / `admin123456`
- User: `user@belanjapulsa.com` / `user123456`

## Catatan

- Jangan upload `.env`, `node_modules`, `.next`, atau `.local-postgres`.
- Untuk production, gunakan database external. Local PostgreSQL di folder `.local-postgres` hanya untuk development.
