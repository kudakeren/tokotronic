import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { USER_STARTING_BALANCE } from "@/lib/starting-balance";
import { makeReferralCode } from "@/lib/utils";
import { registerSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = registerSchema.parse(body);
    const existing = await prisma.user.findFirst({
      where: { OR: [{ email: data.email }, { phone: data.phone }] }
    });
    if (existing) {
      return NextResponse.json({ message: "Email atau nomor HP sudah terdaftar" }, { status: 409 });
    }

    const referrer = data.referralCode
      ? await prisma.user.findUnique({ where: { referralCode: data.referralCode } })
      : null;
    const password = await hash(data.password, 12);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password,
        balance: USER_STARTING_BALANCE,
        referredById: referrer?.id,
        referralCode: makeReferralCode(data.email)
      },
      select: { id: true, name: true, email: true, phone: true, referralCode: true }
    });

    if (referrer) {
      await prisma.referral.create({
        data: { referrerId: referrer.id, referredUserId: user.id }
      });
    }

    return NextResponse.json({ user }, { status: 201 });
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
          : "Registrasi gagal. Periksa data Anda.",
        error: detail
      },
      { status: isDatabaseConnectionError ? 503 : 400 }
    );
  }
}
