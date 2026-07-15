import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { makeReferralCode, slugify } from "@/lib/utils";
import { sellerRegisterSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = sellerRegisterSchema.parse(body);
    const existing = await prisma.user.findFirst({
      where: { OR: [{ email: data.email }, { phone: data.phone }] }
    });
    if (existing) {
      return NextResponse.json({ message: "Email atau nomor HP sudah terdaftar" }, { status: 409 });
    }

    const password = await hash(data.password, 12);
    const baseSlug = slugify(data.storeName);
    const storeSlug = `${baseSlug}-${Math.random().toString(36).slice(2, 7)}`;
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password,
        role: "SELLER",
        referralCode: makeReferralCode(data.email),
        sellerProfile: {
          create: {
            storeName: data.storeName,
            storeSlug,
            description: data.description,
            address: data.address,
            city: data.city
          }
        }
      },
      select: { id: true, name: true, email: true, phone: true }
    });

    return NextResponse.json({ user, message: "Pendaftaran seller berhasil. Akun menunggu approval admin." }, { status: 201 });
  } catch (error) {
    const detail = `${error}`;
    const isDatabaseConnectionError =
      detail.includes("Authentication failed against database server") ||
      detail.includes("Can't reach database server") ||
      detail.includes("Environment variable not found");

    return NextResponse.json(
      {
        message: isDatabaseConnectionError
          ? "Database belum tersambung. Isi .env DATABASE_URL lalu jalankan migrasi Prisma."
          : "Registrasi seller gagal. Periksa data Anda.",
        error: detail
      },
      { status: isDatabaseConnectionError ? 503 : 400 }
    );
  }
}
